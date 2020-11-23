import React, { useEffect, useState } from 'react';
import StyleStep3 from './index.style';
import { Button, Col, Form, Select, Row } from 'antd';
import { VALIDATE_MESSAGES, LAYOUT } from '../config';
import WrappedMap from './map';

const { Option } = Select;

const Step3 = ({ nextStep, prevStep, data, handleChangeData }) => {
  const [form] = Form.useForm();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const getObjectOptions = () => {
    let data = [
      {
        _id: '1',
        name: 'Khói',
      },
      {
        _id: '2',
        name: 'Lửa',
      },
      {
        _id: '3',
        name: 'Nhiệt độ',
      },
    ];

    const options = data.map((item) => {
      return (
        <Option key={item._id} value={item._id}>
          {item.name}
        </Option>
      );
    });
    return options;
  };

  const onFinish = (values) => {
    handleChangeData(values);
    nextStep();
  };

  const onChangeLocation = (location) => {
    console.log('location', location);
    setLocation(location);
  };

  return (
    <StyleStep3>
      <Form
        {...LAYOUT}
        form={form}
        name="flight-hub-object"
        onFinish={onFinish}
        validateMessages={VALIDATE_MESSAGES}
        initialValues={data}
      >
        <Form.Item
          name="objectId"
          label="Đối tượng giám sát"
          rules={[{ type: 'string', required: true }]}
        >
          <Select showSearch placeholder="Chọn đối tượng giám sát">
            {getObjectOptions()}
          </Select>
        </Form.Item>
        <Form.Item
          name="location"
          label="Miền giám sát"
          rules={[{ type: 'string', required: true }]}
        >
          <WrappedMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCV09KQtrmzDnyXYeC_UzB-HAwMKytXRpE"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            onChangeLocation={onChangeLocation}
          />
        </Form.Item>
        <Col offset={6}>
          <Row type="flex">
            <Button type="default" onClick={prevStep}>
              Quay lại
            </Button>
            &ensp;
            <Button type="primary" htmlType="submit">
              Tiếp theo
            </Button>
          </Row>
        </Col>
      </Form>
    </StyleStep3>
  );
};

export default Step3;
