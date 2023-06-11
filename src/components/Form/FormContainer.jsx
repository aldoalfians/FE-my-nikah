import { Col, Row, Typography } from "antd";

export default function FormContainer({ children, title }) {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "var(--border-radius-base)",
            padding: "24px 16px",
            minHeight: "calc(100vh - 150px)",
          }}
        >
          {title && (
            <>
              <Typography.Title level={4}>{title}</Typography.Title>
              <br />
            </>
          )}
          {children}
        </div>
      </Col>
    </Row>
  );
}
