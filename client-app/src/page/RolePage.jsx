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
} from "antd";
import { formartDateClient } from "../config/helper";
import MainPage from "../components/page/MainPage";

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
          <div className="txt_title">role</div>
          <Input.Search
            allowClear
            onChange={onChangeSearch}
            placeholder="Name or Code"
            onSearch={onTextSearch}
          />
          <Select
            onChange={onChangeStatus}
            placeholder="Status"
            allowClear
            style={{ width: 120 }}
          >
            <Select.Option value={"1"}>Active</Select.Option>
            <Select.Option value={"0"}>InActive</Select.Option>
          </Select>
          <DatePicker />
          <DatePicker />
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
