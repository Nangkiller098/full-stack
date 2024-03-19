import { useState } from "react";

import {
  Button,
  Checkbox,
  DatePicker,
  Flex,
  Input,
  InputNumber,
  QRCode,
  Radio,
  Select,
  Space,
  Spin,
  Modal,
} from "antd";
import { DeleteFilled, SaveFilled } from "@ant-design/icons";
const HomePage = () => {
  const { Option } = Select;
  const [open, seOpen] = useState(false);

  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const onOpenModal = () => {
    seOpen(true);
  };

  const handleOk = () => {
    seOpen(false);
  };

  const handleCancel = () => {
    seOpen(false);
  };

  return (
    <div>
      <Flex gap={"small"}>
        <Button disabled={true}>Save1</Button>
        <Button loading={true} type="primary">
          Save1
        </Button>
        <Button size="small" type="dashed">
          Save2
        </Button>
        <Button
          style={{ width: 200, marginTop: 10 }}
          danger={true}
          type="primary"
        >
          Save2
        </Button>
      </Flex>
      <div style={{ width: 300, backgroundColor: "lightgray", marginTop: 10 }}>
        <Button block={true}>AAAA</Button>
      </div>

      <Button icon={<DeleteFilled />}>Delete</Button>
      <Button danger={true} icon={<DeleteFilled />} />
      <SaveFilled style={{ fontSize: 35, margin: 20 }} />

      <Space>
        <Input placeholder="username" /> <br />
        <Input placeholder="Lastname" />
        <Input.TextArea placeholder="Des" />
        <InputNumber />
        <Checkbox />
        <Radio />
        <Select style={{ width: 200 }}>
          <Option value="1">Active </Option>
          <Option value="0">InActive </Option>
        </Select>
        <DatePicker />
        <Select
          mode="tags"
          style={{
            width: 300,
          }}
          placeholder="Tags Mode"
          // onChange={handleChange}
          options={options}
        />
        <QRCode value={"https://"} />
        <Spin spinning={true} />
      </Space>

      <br />
      <Button onClick={onOpenModal}>Open Modal</Button>
      <Modal
        title="Basic Modal"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input placeholder="A" />
        <Input placeholder="A" />
      </Modal>
    </div>
  );
};

export default HomePage;
