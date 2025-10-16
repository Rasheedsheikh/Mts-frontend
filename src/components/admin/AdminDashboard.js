import React, { useEffect, useMemo, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Popconfirm, Tag, Space, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import './AdminDashboard.css';
import { getAdvertisements, createAdvertisement, deleteAdvertisement, updateAdvertisement, patchAdvertisement } from '../../apis/Advertisements';

const { Option } = Select;

const initialForm = {
  title: '',
  description: '',
  location: '',
  sliderType: '', // 'Featured' | ''
  image: null,
};

const AdminDashboard =()=> {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // ad being edited
  const [form] = Form.useForm();

  const fetchAds = async () => {
    setLoading(true);
    try {
      const data = await getAdvertisements();
      setAds(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      message.error('Failed to load advertisements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const columns = useMemo(() => [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (src) => src ? <img src={src} alt="ad" className="admin-table-img" /> : <span style={{color:'#94a3b8'}}>No Image</span>,
      width: 120,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: 140,
    },
    {
      title: 'Type',
      dataIndex: 'sliderType',
      key: 'sliderType',
      width: 120,
      render: (val) => val === 'Featured' ? <Tag color="green">Featured</Tag> : <Tag>Normal</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 180,
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)}>Edit</Button>
          <Popconfirm title="Delete this ad?" okText="Delete" okButtonProps={{ danger: true }} onConfirm={() => onDelete(record)}>
            <Button danger icon={<DeleteOutlined />}>Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ], []);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setModalOpen(true);
  };

  const onEdit = (ad) => {
    setEditing(ad);
    form.setFieldsValue({
      title: ad.title || '',
      description: ad.description || '',
      location: ad.location || '',
      sliderType: ad.sliderType || '',
    });
    setModalOpen(true);
  };

  const onDelete = async (ad) => {
    try {
      await deleteAdvertisement(ad.advertisement_id);
      message.success('Deleted');
      fetchAds();
    } catch (e) {
      console.error(e);
      message.error('Delete failed');
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values); // Debug log
      const fd = new FormData();
      fd.append('title', values.title);
      if (values.description) fd.append('description', values.description);
      if (values.location) fd.append('location', values.location);
      if (values.sliderType) fd.append('sliderType', values.sliderType);
      
      // Handle file input
      const fileInput = document.querySelector('input[type="file"]');
      const file = fileInput?.files?.[0];
      console.log('File from input:', file);
      if (file) {
        fd.append('image', file);
        console.log('File appended to FormData');
      } else {
        console.log('No file selected');
      }

      setLoading(true);
      if (editing) {
        // Using PATCH for partial updates - only sends changed fields
        await patchAdvertisement(editing.advertisement_id, fd);
        message.success('Updated');
      } else {
        await createAdvertisement(fd);
        message.success('Created');
      }
      setModalOpen(false);
      form.resetFields();
      fetchAds();
    } catch (e) {
      if (e?.errorFields) return; // form validation error
      console.error(e);
      message.error(editing ? 'Update failed' : 'Create failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-title">Admin Dashboard — Advertisements</div>
        <div className="admin-toolbar">
          <Button icon={<ReloadOutlined />} onClick={fetchAds}>Refresh</Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>Add Advertisement</Button>
        </div>
      </div>

      <div className="admin-card">
        <Table
          rowKey={(r) => r.advertisement_id || r.id}
          dataSource={ads}
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 10, showSizeChanger: true }}
        />
      </div>

      <Modal
        className="admin-modal"
        title={editing ? 'Edit Advertisement' : 'Add Advertisement'}
        open={modalOpen}
        onOk={handleOk}
        onCancel={() => setModalOpen(false)}
        okText={editing ? 'Save' : 'Create'}
        confirmLoading={loading}
        destroyOnClose
      >
        <Form layout="vertical" form={form} initialValues={initialForm}>
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Title is required' }]}>
            <Input placeholder="Enter title" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} placeholder="Short description" />
          </Form.Item>
          <Form.Item name="location" label="Location (City)" rules={[{ required: true, message: 'Location is required' }]}>
            <Input placeholder="e.g., Mumbai" />
          </Form.Item>
          <Form.Item name="sliderType" label="Slider Type">
            <Select allowClear placeholder="Select type">
              <Option value="Featured">Featured</Option>
              <Option value="">Normal</Option>
            </Select>
          </Form.Item>
          <Form.Item name="image" label="Image">
            <Input type="file" accept="image/*" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminDashboard