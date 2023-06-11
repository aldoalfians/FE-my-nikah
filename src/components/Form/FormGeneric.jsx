import { Button, Col, Form, Row, Space } from "antd";
import { FORM_LAYOUT, FORM_VALIDATE_MESSAGE } from "../../utils/constant";
import { useNavigate } from "react-router-dom";

export default function FormGeneric({
  onFinish,
  children,
  goBackPathname,
  form,
}) {
  const navigate = useNavigate();

  return (
    <Form
      form={form}
      {...FORM_LAYOUT}
      onFinish={onFinish}
      validateMessages={FORM_VALIDATE_MESSAGE}
      layout="vertical"
    >
      {children}
      <Row>
        <Col>
          <Space>
            <Button type="primary" htmlType="submit">
              Simpan
            </Button>
            <Button type="default" onClick={() => navigate(goBackPathname)}>
              Batal
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
}
