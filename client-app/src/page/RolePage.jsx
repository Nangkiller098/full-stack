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
  Typography,
  Segmented,
} from "antd";
import { formartDateClient } from "../config/helper";
import MainPage from "../components/page/MainPage";

const { Title } = Typography;
const RolePage = () => {
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
    const res = await request("role/getList", "get", param);
    setLoading(false);
    if (res) {
      setList(res.list);
    }
  };
  const onClickBtnEdit = (item) => {
    // console.log(item)
    formCat.setFieldsValue({
      Id: item.Id, //
      Name: item.Name,
      Code: item.Code,
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
        const res = await request("role/delete", "delete", data);
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
      Id: Id,
      Name: item.Name,
      Code: item.Code,
      Status: item.Status,
    };
    var method = Id == null ? "post" : "put";
    const url = Id == null ? "role/create" : "role/update";
    const res = await request(url, method, data);
    if (res) {
      message.success(res.message);
      getList();
      onCloseModal();
    }
  };
  const onTextSearch = () => {
    // filterRef.current.txt_search = value // set value to ref key txt_search
    // // var x = filterRef.current.txt_search // get
    // getList();
  };
  const onChangeSearch = (e) => {
    filterRef.current.txt_search = e.target.value;
    getList();
  };
  const onChangeStatus = (e) => {
    filterRef.current.status = e;
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
      <Typography>
        <Title level={1}>Manage Role</Title>
      </Typography>
      <div className="flex 2xl:flex-row flex-col gap-2 justify-start">
        <Input.Search
          allowClear
          onChange={onChangeSearch}
          placeholder="Name or Code"
          onSearch={onTextSearch}
          size="large"
          className="2xl:w-96"
        />
        <Select
          size="large"
          onChange={onChangeStatus}
          placeholder="Status"
          allowClear
          className="2xl:w-56"
        >
          <Select.Option value={"1"}>Active</Select.Option>
          <Select.Option value={"0"}>InActive</Select.Option>
        </Select>

        <Button
          onClick={() => {
            setOpen(true);
          }}
          size="large"
          type="primary"
        >
          New
        </Button>
      </div>
      <Segmented />
      <Table
        className="table"
        rowKey="Id"
        dataSource={list}
        pagination={{
          pageSize: 5,
          // total: 100,
        }}
        // onChange={}
        columns={[
          {
            key: "No",
            title: "No",
            dataIndex: "Name",
            render: (value, item, index) => index + 1,
            responsive: ["sm"],
          },
          {
            key: "Name",
            title: "Name",
            dataIndex: "Name",
          },
          {
            key: "Code",
            title: "Code",
            dataIndex: "Code",
            responsive: ["md"],
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
            responsive: ["md"],
          },
          {
            key: "CreateAt",
            title: "CreateAt",
            dataIndex: "CreateAt",
            render: (value) => formartDateClient(value),
            responsive: ["md"],
          },
          {
            key: "Action",
            title: "Action",
            dataIndex: "Status",
            render: (value, item) => (
              <Space>
                <Button
                  size="large"
                  onClick={() => onClickBtnEdit(item)}
                  type="primary"
                >
                  Edit
                </Button>
                <Button
                  size="large"
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
          formCat.getFieldValue("Id") == null ? "New Catetory" : "Update role"
        }
        open={open}
        onCancel={onCloseModal}
        footer={null}
        width={600}
      >
        <Form form={formCat} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name={"Name"}
            rules={[
              {
                required: true,
                message: "Please input role name!",
              },
            ]}
          >
            <Input placeholder="role name" />
          </Form.Item>

          <Form.Item
            label="Code"
            name={"Code"}
            rules={[
              {
                required: true,
                message: "Please input role Code!",
              },
            ]}
          >
            <Input placeholder="Code" />
          </Form.Item>

          <Form.Item label="Status" name={"Status"}>
            <Select onChange={onChangeStatus}>
              <Select.Option value="1">Actived</Select.Option>
              <Select.Option value="0">InActived</Select.Option>
            </Select>
          </Form.Item>
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

export default RolePage;
