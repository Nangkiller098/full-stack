import { useEffect, useState, useRef } from "react";
import { request } from "../config/request";
import {
  Table,
  Button,
  Space,
  Modal,
  Input,
  Form,
  Select,
  message,
  Image,
  Tag,
  Row,
  Col,
} from "antd";
import { Config, isEmptyOrNull } from "../config/helper";
import MainPage from "../components/page/MainPage";
import { DeleteOutlined } from "@ant-design/icons";
const POSPage = () => {
  const [list, setList] = useState([]);
  // const [category, setCategory] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);

  const [loading, setLoading] = useState(false);
  // const [open, setOpen] = useState(false);
  const [formCat] = Form.useForm();
  // const [fileSelected, setFileSelected] = useState(null); // past to api
  const [subTotal, setSubTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalToPay, setTtotalToPay] = useState(0);

  useEffect(() => {
    formCat.setFieldsValue({
      Status: "1",
    });
    initInfo();
  }, [formCat]);

  const filterRef = useRef({
    txt_search: "",
  });

  // const fileRef = useRef(null);

  const initInfo = async () => {
    setLoading(true);
    const res = await request("pos/initInfo", "get");
    setLoading(false);
    if (res) {
      setCustomer(res.customer);
      setPaymentMethod(res.order_payment_method);
    }
  };

  const getList = async () => {
    if (isEmptyOrNull(filterRef.current.txt_search)) {
      return;
    }
    setLoading(true);
    var param = {
      txt_search: filterRef.current.txt_search,
    };
    const res = await request("pos/searchProduct", "get", param);
    setLoading(false);

    if (res) {
      if (res.list.length == 0) {
        message.error("Product not Found");
      } else {
        var listTmp = res.list;
        listTmp[0]["QtyOrder"] = 1; //create new key qty
        var indexFind = list.findIndex((item) => item.Id == listTmp[0].Id);
        if (indexFind >= 0) {
          // update qty order with current item
          listTmp = list;
          listTmp[indexFind].QtyOrder = listTmp[indexFind].QtyOrder + 1;
        } else {
          listTmp = [...list, ...listTmp]; //concat arry
        }

        //find total to pay
        //find total discount
        var findSubTotal = 0,
          findTotalDiscountPrice = 0,
          findTotalToPay = 0;
        listTmp.map((item) => {
          findSubTotal += Number(item.QtyOrder * item.Price);
          var Dis = item.Discount == null ? 0 : Number(item.Discount);
          findTotalDiscountPrice +=
            (Number(item.QtyOrder) * item.Price * Dis) / 100;
          findTotalToPay += findSubTotal - findTotalDiscountPrice;
        });
        setList(listTmp);
        setSubTotal(findSubTotal);
        setTotalDiscount(findTotalDiscountPrice);
        setTtotalToPay(findTotalToPay);
      }
    }
  };
  const onClickBtnDelete = async (item) => {
    Modal.confirm({
      title: "Delete",
      content: "Are you sure you want to delete ?",
      okText: "Yes",
      cancelText: "No",
      okType: "danger",
      centered: true,
      onOk: async () => {
        var data = {
          Id: item.Id,
        };
        const res = await request("pos/delete", "delete", data);
        if (res) {
          message.success(res.message);
          getList();
        }
      },
    });
  };

  const onFinish = async () => {
    var param = {
      CustomerId: 1,
      PaymentMethodId: 4,
      TotalPaid: 2000,
      Product: list,
    };
    const res = await request("pos/checkout", "post", param);
    if (res) {
      if (res.message) {
        var mgs = "";
        Object.keys(res.message).map((key) => {
          mgs += `${key} : ${res.message[key]}`;
        });
        message.success(mgs);
        setList([]);
        setTtotalToPay(0);
        setTotalDiscount(0);
        setSubTotal(0);
        formCat.resetFields();
      } else {
        message.error("Something went wrong");
      }

      // getList();
      // onCloseModal();
    }
  };

  const onTextSearch = (e) => {
    filterRef.current.txt_search = e;
    getList();
  };

  // const onSelectCategory = (value) => {
  //   filterRef.current.category_id = value;
  //   getList();
  // };

  // const onCloseModal = () => {
  //   formCat.resetFields();
  //   formCat.setFieldsValue({
  //     Status: "1",
  //   });
  //   setOpen(false);
  // };

  return (
    <MainPage loading={loading}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 10,
        }}
      >
        <Space>
          <div className="txt_title">Product</div>

          <Input.Search
            allowClear
            onSearch={onTextSearch}
            placeholder="Name or Code"
            size="large"
          />

          <Button type="primary" size="large">
            Clear
          </Button>
        </Space>
      </div>

      <Row gutter={15}>
        <Col span={16}>
          <Table
            className=" justify-center"
            rowKey={"Id"}
            dataSource={list}
            pagination={{
              pageSize: 5,
              // total: 100,
            }}
            columns={[
              {
                key: "Name",
                title: "Name",
                dataIndex: "Name",
                render: (value, item, index) => {
                  return (
                    <>
                      <div>
                        {index + 1} {item.Name}
                      </div>
                      <div>
                        <Tag
                          color={item.Qty > 5 ? "green" : "red"}
                          className=" w-16 text-center font-bold"
                        >
                          {item.Qty}
                        </Tag>
                      </div>
                      <div>{item.Description}</div>
                    </>
                  );
                },
              },
              {
                key: "QtyOrder",
                title: "Qty",
                dataIndex: "QtyOrder",
              },
              {
                key: "Price",
                title: "Price",
                dataIndex: "Price",
              },
              {
                key: "Dis",
                title: "Dis",
                dataIndex: "Discount",
              },
              {
                key: "Total",
                title: "Total",
                render: (value, items) => {
                  let QtyOrder = items.QtyOrder;
                  let Price = items.Price;
                  let Dis = items.Discount == null ? 0 : items.Discount;
                  let DiscountPrice = (QtyOrder * Price * Dis) / 100;
                  // let Total = Price;
                  var Total = QtyOrder * Price - DiscountPrice;
                  // var Total = 3333;
                  return Total;
                },
              },
              {
                key: "Image",
                title: "Image",
                dataIndex: "Image",
                render: (value) => {
                  if (value != null && value != "") {
                    return (
                      <Image
                        src={Config.image_path + value}
                        width={100}
                        height={100}
                      />
                    );
                  } else {
                    return (
                      <div
                        style={{
                          height: 100,
                          width: 100,
                          backgroundColor: "#888",
                        }}
                      ></div>
                    );
                  }
                },
              },

              {
                key: "Action",
                title: "Action",
                dataIndex: "Status",
                render: (value, item) => (
                  <Space>
                    <Button
                      onClick={() => onClickBtnDelete(item)}
                      type="primary"
                      danger
                      size="large"
                    >
                      <DeleteOutlined />
                    </Button>
                  </Space>
                ),
              },
            ]}
          />
        </Col>
        <Col span={8} className=" bg-gray-200">
          <Form form={formCat} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Customer"
              name={"Customer"}
              rules={[
                {
                  required: true,
                  message: "Please fil in Customer!",
                },
              ]}
            >
              <Select
                placeholder="Select Customer"
                showSearch
                optionFilterProp="label"
                size="large"
                className="w-full"
              >
                {customer.map((item, index) => (
                  <Select.Option label={item.Tel} key={index} value={item.Id}>
                    {item.Firstname} {item.Lastname} {item.Tel}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Payment Method"
              name={"Payment Method"}
              rules={[
                {
                  required: true,
                  message: "Please input Payment Method!",
                },
              ]}
            >
              <Select
                // onSelect={onSelectCategory}
                placeholder="Select Payment Method"
                showSearch
                optionFilterProp="label"
                size="large"
                className="w-full"
              >
                {paymentMethod.map((item, index) => (
                  <Select.Option label={item.Name} key={index} value={item.Id}>
                    {item.Name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <div className="flex justify-between p-2">
              <div>Sub Total</div>
              <div>{subTotal}$</div>
            </div>

            <div className="flex justify-between p-2">
              <div>Discount</div>
              <div>{totalDiscount}$</div>
            </div>

            <div className="flex justify-between p-2">
              <div>Total</div>
              <div>{totalToPay}$</div>
            </div>

            <Form.Item style={{ textAlign: "right" }}>
              <Space>
                <Button type="primary" htmlType="submit" size="large">
                  Check Out
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>

      {/* <Modal
        forceRender
        title={
          formCat.getFieldValue("Id") == null ? "New product" : "Update product"
        }
        open={open}
        onCancel={tru}
        footer={null}
        closable={false}
        allowClear
      >
        <Form form={formCat} layout="vertical" onFinish={onFinish}>
          <Row gutter={5}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name={"Name"}
                rules={[
                  {
                    required: true,
                    message: "Please input Product Name!",
                  },
                ]}
              >
                <Input placeholder="Name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Description"
                name={"Description"}
                rules={[
                  {
                    required: true,
                    message: "Please input Description!",
                  },
                ]}
              >
                <Input placeholder="Description" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={5}>
            <Col span={12}>
              <Form.Item
                label="Qty"
                name={"Qty"}
                rules={[
                  {
                    required: true,
                    message: "Please fil in Qty!",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} placeholder="Qty" />
              </Form.Item>
            </Col>

            <Col span={12}>
              {" "}
              <Form.Item
                label="Price"
                name={"Price"}
                rules={[
                  {
                    required: true,
                    message: "Please input Price!",
                  },
                ]}
              >
                <InputNumber placeholder="Price" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal> */}
    </MainPage>
  );
};

export default POSPage;
