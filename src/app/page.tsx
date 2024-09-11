import { Row, Col, Space , Image, Divider} from "antd";
import CandleStick from "./charts/CandleStick";
import LineChart from "./charts/LineChart";
import BarChart from "./charts/BarChart";
import PieChart from "./charts/PieChart";
import style from './styles/charts.module.css';

export default function Home() {
  return (
    <Space direction="vertical" size={"large"} className={style.rowContainer}>
    <Row gutter={10} className={style.rowContainer} align={"middle"} justify={"center"}>
      <Col>
      <Image src="./icons/icon.png" width={29}/>
      </Col>
      <Col>
      <span className={style.title}>Blockhouse</span>
      </Col>
      <Col span={21}>
      <Divider/>
      </Col>
    </Row>
    <Row gutter={[16, 24]} className={style.rowContainer}>
      <Col xs={24} lg={12} className={style.colContainer}>
       <CandleStick/>
      </Col>
      <Col xs={24} lg={12} className={style.colContainer}>
      <LineChart/>
      </Col>
      <Col xs={24} lg={12} className={style.colContainer}>
      <BarChart/>
      </Col>
      <Col xs={24} lg={12} className={style.colContainer}>
      <PieChart/>
      </Col>
    </Row>
    </Space>
  );
}
