import { Button, Card, Col, Form, Input, Row } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import React, { useEffect } from "react";
import { LoginUser, reset } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const onFinish = (values) => {
    dispatch(LoginUser(values));
  };

  return (
    <div className="LoginRoute__container">
      <Card className="LoginRoute__card">
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <Form layout="horizontal" onFinish={onFinish}>
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Masukan Email!" }]}
                style={{ marginBottom: 8 }}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  className="LoginRoute__input"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Masukan Password!" }]}
                style={{ marginBottom: 16 }}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  className="LoginRoute__input"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="LoginRoute__button"
                loading={isLoading}
              >
                Masuk
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
