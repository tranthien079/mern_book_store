import React from "react";
import { Button, Checkbox, Col, Form, Input, Row,Typography, notification } from "antd";
import { createUserApi } from "../../util/api";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, IdcardOutlined ,UserOutlined ,LockOutlined   } from "@ant-design/icons";
import background from '/background.jpg'

const RegisterPage = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { name, email, password, role = "user" } = values;

    const res = await createUserApi(name, email, password,role);

    if (res && res?.data?.status !== 'error') {
      notification.success({
        message: "Create user successfully",
        showProgress: true,
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Create user failed",
        description: res?.data?.message,
        showProgress: true,
      });
    }
  };
  return (
    <div className="p-4 h-screen flex items-center justify-center bg-[url('/background.jpg')] bg-cover bg-no-repeat" >
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-white">
        <h1 className="text-3xl font-semibold text-center text-blue-500">Đăng ký</h1>
           
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email!",
                  },
                ]}
              >
                <Input 
                prefix={<IdcardOutlined  className="site-form-item-icon" />}
                
                />
              </Form.Item>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên!",
                  },
                ]}
              >
                <Input 
                prefix={<UserOutlined className="site-form-item-icon" />}
                
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                ]}
              >
                <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                
                />
              </Form.Item>
                <Button type="primary" htmlType="submit" block className="my-3">
                  Đăng ký
                </Button>
              <span className="text-blue-500 cursor-pointer hover:text-blue-300" onClick={() => navigate('/')}><ArrowLeftOutlined/> Quay lại trang chủ</span>
                <div className="text-center text-dark">
                  Bạn đã có tài khoản. <span className="text-blue-500 cursor-pointer hover:text-blue-300" onClick={() => navigate('/login')}>Đăng nhập</span>
                </div>
            </Form>
            </div>
          </div>
      </div>
  );
  
};

export default RegisterPage;
