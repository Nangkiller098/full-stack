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
import dayjs from "dayjs";

const InvoicePage = () => {
  const [list, setList] = useState([]);
  const [role, setRole] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [open, setOpen] = useState(false);
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
    const res = await request("employee/getlist", "get", param);
    setLoading(false);
    if (res) {
      setList(res.list);
      setRole(res.role);
    }
  };
  const onClickBtnEdit = (item) => {
    formCat.setFieldsValue({
      ...item,
      Dob: dayjs(item.Dob),
      Gender: item.Gender + "",
      Status: item.Status + "",
      RoleId: item.RoleId,
    });
    // setOpen(true);
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
        const res = await request("employee/delete", "delete", data);
        if (res) {
          message.success(res.message);
          getList();
        }
      },
    });
  };
  //   const onFinish = async (item) => {
  //     var Id = formCat.getFieldValue("Id");
  //     var data = {
  //       ...item,
  //       Id: Id,
  //       Dob: formartDateServer(item.Dob),
  //       CategoryId: 1,
  //     };
  //     var method = Id == null ? "post" : "put";
  //     const url = Id == null ? "employee/create" : "employee/update";
  //     const res = await request(url, method, data);
  //     if (res) {
  //       message.success(res.message);
  //       getList();
  //       onCloseModal();
  //     }
  //   };

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

  const onSelectRole = (value) => {
    filterRef.current.role_id = value;
    getList();
  };

  //   const onCloseModal = () => {
  //     formCat.resetFields();
  //     formCat.setFieldsValue({
  //       Status: "1",
  //     });
  //     setOpen(false);
  //   };

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
          <Select
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
          </Select>
          <DatePicker />
          <DatePicker />
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
            key: "RoleId",
            title: "Role",
            dataIndex: "RoleName",
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
    </MainPage>
  );
};

export default InvoicePage;
