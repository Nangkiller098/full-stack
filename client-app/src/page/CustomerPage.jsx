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
  Tag,
  DatePicker,
  Row,
  Col,
} from "antd";
import { formartDateClient, formartDateServer } from "../config/helper";
import MainPage from "../components/page/MainPage";
import dayjs from "dayjs";

const CustomerPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
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
  });

  const getList = async () => {
    setLoading(true);
    var param = {
      txt_search: filterRef.current.txt_search,
      status: filterRef.current.status,
    };
    const res = await request("customer/getlist", "get", param);
    setLoading(false);
    if (res) {
      setList(res.list);
    }
  };
  const onClickBtnEdit = (item) => {
    formCat.setFieldsValue({
      ...item,
      Dob: dayjs(item.Dob),
      Gender: item.Gender + "",
      Status: item.Status + "",
    });
    setOpen(true);
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
        const res = await request("customer/delete", "delete", data);
        if (res) {
          message.success(res.message);
          getList();
        }
      },
    });
  };
  const onFinish = async (item) => {
    var Id = formCat.getFieldValue("Id");
    var data = {
      ...item,
      Id: Id,
      Dob: formartDateServer(item.Dob),
    };

    // var data = {
    //   Id: Id,
    //   Name: item.Name,
    //   Code: item.Code,
    //   Status: item.Status,
    //   UserId: 1,
    // };
    var method = Id == null ? "post" : "put";
    const url = Id == null ? "customer/create" : "customer/update";
    const res = await request(url, method, data);
    if (res) {
      message.success(res.message);
      getList();
      onCloseModal();
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

  const onCloseModal = () => {
    formCat.resetFields();
    formCat.setFieldsValue({
      Status: "1",
    });
    setOpen(false);
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
          <div className="txt_title">Custmer</div>
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
            allowClear
          >
            <Select.Option value="1">Active</Select.Option>
            <Select.Option value="0">InActive</Select.Option>
          </Select>
        </Space>

        <Button
          onClick={() => {
            setOpen(true);
          }}
          type="primary"
        >
          New
        </Button>
      </div>
      <Table
        rowKey="Id"
        dataSource={list}
        pagination={{
          pageSize: 5,
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
            key: "Firstname",
            title: "Firstname",
            dataIndex: "Firstname",
          },
          {
            key: "Lastname",
            title: "Lastname",
            dataIndex: "Lastname",
          },
          {
            key: "Gender",
            title: "Gender",
            dataIndex: "Gender",
            render: (value) => (value == 1 ? "Male" : "Female"),
          },
          {
            key: "Dob",
            title: "Dob",
            dataIndex: "Dob",
            render: (value) => formartDateClient(value),
          },
          {
            key: "Tel",
            title: "Tel",
            dataIndex: "Tel",
          },
          {
            key: "Address",
            title: "Address",
            dataIndex: "Address",
          },

          {
            key: "Status",
            title: "Status",
            dataIndex: "Status",
            render: (value) =>
              value == 1 ? (
                <Tag color="green">Actived</Tag>
              ) : (
                <Tag color="red">InActived</Tag>
              ),
          },
          {
            key: "CreateAt",
            title: "CreateAt",
            dataIndex: "CreateAt",
            render: (value) => formartDateClient(value),
          },
          {
            key: "Action",
            title: "Action",
            dataIndex: "Status",
            render: (value, item) => (
              <Space>
                <Button onClick={() => onClickBtnEdit(item)} type="primary">
                  Edit
                </Button>
                <Button
                  onClick={() => onClickBtnDelete(item)}
                  type="primary"
                  danger
                >
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
      />
      <Modal
        forceRender
        title={
          formCat.getFieldValue("Id") == null
            ? "New customer"
            : "Update customer"
        }
        open={open}
        onCancel={onCloseModal}
        footer={null}
        closable={false}
      >
        <Form form={formCat} layout="vertical" onFinish={onFinish}>
          <Row gutter={5}>
            <Col span={12}>
              <Form.Item
                label="Firstname"
                name={"Firstname"}
                rules={[
                  {
                    required: true,
                    message: "Please input Firstname!",
                  },
                ]}
              >
                <Input placeholder="Firstname" />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item
                label="Lastname"
                name={"Lastname"}
                rules={[
                  {
                    required: true,
                    message: "Please input Lastname!",
                  },
                ]}
              >
                <Input placeholder="Lastname" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={5}>
            <Col span={12}>
              <Form.Item
                label="Gender"
                name={"Gender"}
                rules={[
                  {
                    required: true,
                    message: "Please fil in Gender!",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="1">Male</Select.Option>
                  <Select.Option value="0">Female</Select.Option>
                  <Select.Option value="2">Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item
                label="Dob"
                name={"Dob"}
                rules={[
                  {
                    required: true,
                    message: "Please input Dob!",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                  placeholder="DOB"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={5}>
            <Col span={12}>
              <Form.Item
                label="Tel"
                name={"Tel"}
                rules={[
                  {
                    required: true,
                    message: "Please input Tel!",
                  },
                ]}
              >
                <Input placeholder="Tel" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email" name={"Email"}>
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={5}>
            <Col span={12}>
              <Form.Item label="Status" name={"Status"}>
                <Select>
                  <Select.Option value={"1"}>Actived</Select.Option>
                  <Select.Option value={"0"}>InActived</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item label="Address" name={"Address"}>
                <Input placeholder="Address" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={onCloseModal}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {formCat.getFieldValue("Id") == null ? "Save" : "Update"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </MainPage>
  );
};

export default CustomerPage;
