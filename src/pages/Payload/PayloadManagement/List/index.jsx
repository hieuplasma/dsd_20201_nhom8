import React, { Component } from "react";
import { Table, Space, Input, Form, Select, Modal, DatePicker, Row, Col } from 'antd';
import { Button } from 'antd';
import StyleList from './index.style';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

import axios from 'axios';

class List extends Component {

  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      currentTable: null,
      tables: [],
      idPayload: null,
      modalLoading: false,
      detailBill: [],
      detailPayload: {},
      options: [],
      payload: {},
      visibleAdd: false,
    }
  }

  handleClick() {
    let history = useHistory();
    history.push("/edit-payload");
  }

  componentDidMount() {
      this.loadAllPayload();
      this.getAllTypePayload();
  }
  
  loadAllPayload(){
    axios.get(`http://dsd06.herokuapp.com/api/payload`)
    .then(res => {
      //const persons = res.data;
      this.setState({ tables: res.data });
    })
  }


  showModal = (record) => {
    this.setState({ visible: true });
    
    this.setState({ detailPayload: record });
    this.setState({ idPayload: record.id })
    //this.getDetailPayload(record.id);
  };

  handleOk = e => {
    this.setState({ visible: false })
  };

  handleCancel = e => {
    this.setState({ visible: false })
  };

  
  handleCancelAdd = e => {
    this.setState({ visibleAdd: false })
  };

  getAllTypePayload() {
    axios.get(`https://dsd06.herokuapp.com/api/payloadtype`)
      .then(res => {
        const options = res.data.map(payload =>
          ({
            label: payload.name,
            value: payload._id,
          })
        )
        //const persons = res.data;
        this.setState({ Options: options });
      })
    //console.log(this.state.Options.length)
    //alert(this.state.Options)
  }

  /* getDetailPayload(id) {
    axios.get(`http://dsd06.herokuapp.com/api/payload/` + id)
      .then(res => {
        //const persons = res.data;
        
        this.setState({ detailPayload: res.data });
        console.log(this.state.detailPayload)
      })
  } */

  handleFormSubmitEdit(values){
    const data = {
      code: values.code,
      name: values.name,
      type: values.type,
      detail: {
        manufacturer: values.manufacturer,
        weight: values.weight,
        opticalZoom: values.opticalZoom,
        digitalZoom: values.digitalZoom,
        panning: {
          min: values.panningmin,
          max: values.panningmax,
        },
        tilting: {
          min: values.tiltingmin,
          max: values.tiltingmax
        },
        zoom: {
          min: values.zoomingmin,
          max: values.zoomingmax
        },
        size: {
          width: values.sizewidth,
          length: values.sizelength,
          height: values.sizeheight
        }
      }

    };
    axios.put(`https://dsd06.herokuapp.com/api/payload/`+ this.state.idPayload , data)
      .then(res => {
        console.log(res.data);
        this.setState({ visible: false })
        this.loadAllPayload();
      })
    
  }

  renderModal() {
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    };
    return <Form   {...layout} onFinish={(values) => this.handleFormSubmitEdit(values)} >

      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item initialValue={this.state.detailPayload.code}
            label="Mã"
            name="code"
            rules={[{ required: true, message: 'Hãy nhập mã!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item initialValue={this.state.detailPayload.name}
            label="Tên"
            name="name"
            rules={[{ required: true, message: 'Hãy nhập tên payload!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label="Loại" initialValue={this.state.detailPayload.type_id}
            name="type"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Select options={this.state.Options} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label="Mô tả"
            name="desciption"
            
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Weight" name="weight" initialValue={this.state.detailPayload.weight}>
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Nhà sản xuất" name="manufacturer" initialValue={this.state.detailPayload.manufacturer}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item label="OpticalZoom" name="opticalZoom" initialValue={this.state.detailPayload.opticalZoom} >
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="DigitalZoom" name="digitalZoom" initialValue={this.state.detailPayload.digitalZoom}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Panning min" name="panningmin" initialValue={this.state.detailPayload.panningmin}>
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Panning max" name="panningmax" initialValue={this.state.detailPayload.panningmax}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Tilting min" name="tiltingmin" initialValue={this.state.detailPayload.tiltingmin} >
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Tilting max" name="tiltingmax" initialValue={this.state.detailPayload.tiltingmax}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Zooming min" name="zoomingmin" initialValue={this.state.detailPayload.zoommin}>
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Zooming max" name="zoomingmax" initialValue={this.state.detailPayload.zoommax}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={8}>
          <Form.Item label="Width" name="sizewidth" initialValue={this.state.detailPayload.sizewidth}>
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8} >
          <Form.Item label="Height" name="sizeheight" initialValue={this.state.detailPayload.sizeheight}>
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item label="Length" name="sizelength" initialValue={this.state.detailPayload.sizelength}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
   </Button>
      </Form.Item>
    </Form>

     

  }

  showModalAdd() {
    this.setState({ visibleAdd: true });
  }

  handleFormSubmit(values){
    console.log(values)
    const data = {
      code: values.code,
      name: values.name,
      type: values.type,
      detail: {
        manufacturer: values.manufacturer,
        weight: values.weight,
        opticalZoom: values.opticalZoom,
        digitalZoom: values.digitalZoom,
        panning: {
          min: values.panningmin,
          max: values.panningmax,
        },
        tilting: {
          min: values.tiltingmin,
          max: values.tiltingmax
        },
        zoom: {
          min: values.zoomingmin,
          max: values.zoomingmax
        },
        size: {
          width: values.sizewidth,
          length: values.sizelength,
          height: values.sizeheight
        }
      }

    };
    axios.post(`https://dsd06.herokuapp.com/api/payload`, data)
      .then(res => {
        console.log(res.data);
        this.setState({ visibleAdd: false })
        this.loadAllPayload();
      })
    
  }

  renderModalAdd() {
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    };
    return <Form   {...layout} onFinish={(values) => this.handleFormSubmit(values)} >

      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label="Mã"
            name="code"
            rules={[{ required: true, message: 'Hãy nhập mã!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: 'Hãy nhập tên payload!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label="Loại"
            name="type"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Select options={this.state.Options} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label="Mô tả"
            name="desciption"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Weight" name="weight">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Nhà sản xuất" name="manufacturer">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item label="OpticalZoom" name="opticalZoom">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="DigitalZoom" name="digitalZoom">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Panning min" name="panningmin">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Panning max" name="panningmax">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Tilting min" name="tiltingmin">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Tilting max" name="tiltingmax">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Zooming min" name="zoomingmin">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Zooming max" name="zoomingmax">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={8}>
          <Form.Item label="Width" name="sizewidth">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8} >
          <Form.Item label="Height" name="sizeheight">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item label="Length" name="sizelength">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
   </Button>
      </Form.Item>
    </Form>
  }

  render() {

    const dataSource = this.state.tables.map(payload =>
      ({
        id: payload._id,
        code: payload.code,
        name: payload.name,
        status: payload.status,
        manufacturer: payload.detail.manufacturer,
        type: payload.type.name,
        des: payload.type.description,
        type_id: payload.type._id,
        weight: payload.detail.weight,
        manufacturer: payload.detail.manufacturer,
        opticalZoom: payload.detail.opticalZoom,
        digitalZoom: payload.detail.digitalZoom,
        sizewidth: payload.detail.size.width,
        sizeheight: payload.detail.size.height,
        sizelength: payload.detail.size.length,
        panningmin: payload.detail.panning.min,
        panningmax: payload.detail.panning.max,
        tiltingmin: payload.detail.tilting.min,
        tiltingmax: payload.detail.tilting.max,
        zoommin: payload.detail.zoom.min,
        zoommax: payload.detail.zoom.max,

      })
    )



    const columns = [
      {
        title: 'Mã ',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Nhà sản xuất',
        dataIndex: 'manufacturer',
        key: 'manufacturer',
      },
      {
        title: 'Loại',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Mô tả',
        dataIndex: 'des',
        key: 'des',
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Action',
        key: 'operation',
        width: 100,
        render: (text, record) => (

          <Space size="small" >
            {/*  <Button type="link" onClick={() => history.push('/payload-configuration')}>Cấu hình</Button> */}
            <Button type="link" onClick={() => this.showModal(record)} >Sửa</Button>
            <Button danger type="text">Xóa</Button>
          </Space>
        ),
      },
    ];

    const { visible, visibleAdd, currentTable, tables } = this.state;

    return (
      <StyleList>
        <div>
          <div>Quản lý Payload</div>
          <Form
            layout="horizontal"
            className="searchtype"
          >
            <Row justify="space-around">
              <Col span={4}>
                <Form.Item label="Tên">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Loại">
                  <Select>
                    <Select.Option value="demo">Demo</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Trạng thái">
                  <Select>
                    <Select.Option value="demo">Demo</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Button type="primary" icon={<SearchOutlined />}>
                  Tìm kiếm
              </Button>
              </Col>
            </Row>
          </Form>
          <Button type="primary" className="buttontype" onClick={() => this.showModalAdd()} >Thêm</Button>
          <Table dataSource={dataSource} columns={columns} />;
        </div>
        <Modal
          title="Chi tiết"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null} width={800}
        >
          {
            this.renderModal()
          }
        </Modal>

        <Modal
          title="Thêm Payload" width={800}
          visible={visibleAdd}
          onOk={this.handleOkAdd}
          onCancel={this.handleCancelAdd}
          footer={null}
        >
          {
            this.renderModalAdd()
          }
        </Modal>
      </StyleList>
    );
  }
}
export default List; 