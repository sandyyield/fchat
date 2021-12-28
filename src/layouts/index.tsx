import { Layout } from "antd";
import { Context } from "./Context";
import { Foot } from "./Foot";
import { Head } from "./Head";
import { Left } from "./Left";

export const Layouts = () => {

    return (
        <div className="layout">
            <Layout>
                <Head />
                <Layout >
                    <Left />
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Context />
                    </Layout>
                </Layout>
                <Foot />
            </Layout>
        </div>
    );
}