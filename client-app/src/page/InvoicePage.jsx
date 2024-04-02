import { useEffect, useState, useRef } from "react";
import { request } from "../config/request";
import {
  Table,
  Space,
  Input,
  Form,
  Select,
  Button,
  Modal,
  Row,
  Col,
  Image,
} from "antd";
import { Config, formartDateClient } from "../config/helper";
import MainPage from "../components/page/MainPage";

const InvoicePage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [formCat] = Form.useForm();

  useEffect(() => {
    formCat.setFieldsValue({
      Status: "1",
    });
    getList();
  }, [formCat]);

  const filterRef = useRef({
    txt_search: "",
    status: "",
    role_id: "All",
  });

  const getList = async () => {
    setLoading(true);
    var param = {
      txt_search: filterRef.current.txt_search,
      status: filterRef.current.status,
      role_id: filterRef.current.role_id,
    };
    const res = await request("invoice", "get", param);
    setLoading(false);
    if (res) {
      setList(res.list);
    }
  };

  const onTextSearch = (e) => {
    filterRef.current.txt_search = e.target;
    getList();
  };
  const onChangeSearch = (e) => {
    filterRef.current.txt_search = e.target.value;
    getList();
  };
  const onChangeStatus = (value) => {
    filterRef.current.status = value;
    getList();
  };

  const onViewDetails = async (Id) => {
    setLoading(true);
    setOpen(true);
    const res = await request("invoice_details/ " + Id, "get", {});
    setLoading(false);
    if (res) {
      setInvoiceDetails(res.list);
    }
  };

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
          <div className="txt_title">Invoice Page</div>
          <Input.Search
            allowClear
            onChange={onChangeSearch}
            placeholder="Name or Code"
            onSearch={onTextSearch}
          />
          <Select
            onChange={onChangeStatus}
            placeholder="Status"
            style={{ width: 120 }}
            defaultValue={"1"}
          >
            <Select.Option value="1">Active</Select.Option>
            <Select.Option value="0">InActive</Select.Option>
          </Select>
          {/* <Select
            onSelect={onSelectRole}
            placeholder="Select Role"
            showSearch
            optionFilterProp="label"
            defaultValue={"All"}
          >
            <Select.Option label="All" value="All">
              All
            </Select.Option>
            {role.map((item, index) => (
              <Select.Option label={item.Name} key={index} value={item.Id}>
                {item.Name}
              </Select.Option>
            ))}
          </Select> */}
        </Space>
      </div>
      <Table
        rowKey="Id"
        dataSource={list}
        pagination={{
          pageSize: 5,
          total: 100,
        }}
        // onChange={}
        columns={[
          {
            key: "No",
            title: "No",
            dataIndex: "Name",
            render: (value, item, index) => index + 1,
          },
          {
            key: "Id",
            title: "Id",
            dataIndex: "Id",
          },
          {
            key: "CustomerName",
            title: "CustomerName",
            dataIndex: "CustomerName",
          },
          {
            key: "EmployeeName",
            title: "EmployeeName",
            dataIndex: "EmployeeName",
          },
          {
            key: "TotalQty",
            title: "TotalQty",
            dataIndex: "TotalQty",
          },
          {
            key: "TotalAmount",
            title: "TotalAmount",
            dataIndex: "TotalAmount",
          },
          {
            key: "TotalPaid",
            title: "TotalPaid",
            dataIndex: "TotalPaid",
          },
          {
            key: "PaymentMethod",
            title: "PaymentMethod",
            dataIndex: "PaymentMethod",
          },
          {
            key: "OrderStatus",
            title: "OrderStatus",
            dataIndex: "OrderStatus",
          },
          {
            key: "CreateAt",
            title: "CreateAt",
            dataIndex: "CreateAt",
            render: (value) => formartDateClient(value),
          },
          {
            key: "Item Details",
            title: "Item Details",
            dataIndex: "Id",
            render: (value) => {
              return (
                <Button onClick={() => onViewDetails(value)} type="link">
                  Item Details
                </Button>
              );
            },
          },
        ]}
      />
      <Modal open={open} onCancel={() => setOpen(false)}>
        {invoiceDetails.map((item, index) => {
          return (
            <Row key={index}>
              <Col span={12}>
                <Row>
                  <Col>
                    <Image width={120} src={Config.image_path + item.Image} />
                  </Col>
                  <Col>
                    <div>{item.Name}</div>
                    <div>{item.Description}</div>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <div>{item.Price}</div>
                <div>{item.Qty}</div>
                <div>{item.Discount}</div>
              </Col>
            </Row>
          );
        })}
      </Modal>
    </MainPage>
  );
};

export default InvoicePage;
