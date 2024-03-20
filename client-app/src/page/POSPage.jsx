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
  InputNumber,
} from "antd";
import { Config } from "../config/helper";
import MainPage from "../components/page/MainPage";
import { DeleteOutlined } from "@ant-design/icons";
const POSPage = () => {
  const [list, setList] = useState([]);
  const [category, setCategory] = useState([]);

  const [loading, setLoading] = useState(false);
  // const [open, setOpen] = useState(false);
  const [formCat] = Form.useForm();
  // const [fileSelected, setFileSelected] = useState(null); // past to api
  // const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    formCat.setFieldsValue({
      Status: "1",
    });
    getList();
  }, [formCat]);

  const filterRef = useRef({
    txt_search: "",
    status: "",
    category_id: "",
  });

  // const fileRef = useRef(null);

  const getList = async () => {
    setLoading(true);
    var param = {
      txt_search: filterRef.current.txt_search,
      status: filterRef.current.status,
      category_id: filterRef.current.category_id,
    };
    const res = await request("product/getlist", "get", param);
    setLoading(false);
    if (res) {
      setList(res.list);
      setCategory(res.category);
    }
  };

  // const onClickBtnEdit = (item) => {
  //   formCat.setFieldsValue({
  //     ...item,
  //     Status: item.Status === null ? "0" : item.Status + "",
  //     CategoryId: item.CategoryId === null ? "" : item.CategoryId + "",
  //     Image: item.Image,
  //   });
  //   setFilePreview(Config.image_path + item.Image);
  //   setOpen(true);
  // };

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
        const res = await request("product/delete", "delete", data);
        if (res) {
          message.success(res.message);
          getList();
        }
      },
    });
  };

  // const onFinish = async (item) => {
  //   var Id = formCat.getFieldValue("Id");
  //   var form = new FormData();
  //   form.append("Id", Id);
  //   form.append("Name", item.Name);
  //   form.append("Description", item.Description);
  //   form.append("Qty", item.Qty);
  //   form.append("Price", item.Price);
  //   form.append("Discount", item.Discount);
  //   form.append("CategoryId", item.CategoryId);
  //   form.append("Status", item.Status);
  //   form.append("PreImage", formCat.getFieldValue("Image"));

  //   if (fileSelected != null) {
  //     form.append("image", fileSelected);
  //   }
  //   var method = Id == null ? "post" : "put";
  //   const url = Id == null ? "product/create" : "product/update";
  //   const res = await request(url, method, form);
  //   if (res) {
  //     message.success(res.message);
  //     getList();
  //     onCloseModal();
  //   }
  // };

  const onTextSearch = () => {
    // filterRef.current.txt_search = e.target;
    // getList();
  };

  const onChangeSearch = (e) => {
    filterRef.current.txt_search = e.target.value;
    getList();
  };

  const onSelectCategory = (value) => {
    filterRef.current.category_id = value;
    getList();
  };

  // const onCloseModal = () => {
  //   formCat.resetFields();
  //   formCat.setFieldsValue({
  //     Status: "1",
  //   });
  //   setOpen(false);
  //   onRemoveFileSelected();
  // };

  // const onChangeFile = (e) => {
  //   var file = e.target.files[0];
  //   var filePreview = URL.createObjectURL(file);
  //   setFileSelected(file);
  //   setFilePreview(filePreview);
  // };

  // const onRemoveFileSelected = () => {
  //   fileRef.current.value = null;
  //   setFilePreview(null);
  //   setFileSelected(null);
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
            onChange={onChangeSearch}
            placeholder="Name or Code"
            onSearch={onTextSearch}
          />
          <Select
            onSelect={onSelectCategory}
            placeholder="Select Category"
            showSearch
            optionFilterProp="label"
          >
            <Select.Option value="All" label="All">
              All
            </Select.Option>
            {category.map((item, index) => (
              <Select.Option label={item.Name} key={index} value={item.Id}>
                {item.Name}
              </Select.Option>
            ))}
          </Select>
        </Space>
      </div>
      <Row gutter={15}>
        <Col span={16}>
          <Table
            rowKey={"Id"}
            dataSource={list}
            pagination={{
              pageSize: 5,
              // total: 100,
            }}
            columns={[
              {
                key: "No",
                title: "No",
                dataIndex: "Name",
                render: (value, item, index) => index + 1,
              },
              {
                key: "Name",
                title: "Name",
                dataIndex: "Name",
                render: (value, item, index) => {
                  return (
                    <>
                      <div>
                        {index + 1}
                        {item.Name}
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
                key: "Qty",
                title: "Qty",
                dataIndex: "Qty",
              },
              {
                key: "Price",
                title: "Price",
                dataIndex: "Price",
              },
              {
                key: "Discount",
                title: "Discount",
                dataIndex: "Discount",
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
                    >
                      <DeleteOutlined />
                    </Button>
                  </Space>
                ),
              },
            ]}
          />
        </Col>
        <Col span={8}>
          <Form form={formCat} layout="vertical">
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

              <Col>
                
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      {/* <Modal
        forceRender
        title={
          formCat.getFieldValue("Id") == null ? "New product" : "Update product"
        }
        open={open}
        onCancel={onCloseModal}
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
