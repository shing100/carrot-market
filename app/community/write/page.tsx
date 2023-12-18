import type { NextPage } from "next";
import Button from "../../../components/button";
import TextArea from "../../../components/textarea";
import Layout from "../../../components/layout";

const Write: NextPage = () => {
    return (
        <Layout canGoBack title="글쓰기">
            <form className="p-4 space-y-4">
                <TextArea required placeholder="질문하세요!" />
                <Button text="Submit" />
            </form>
        </Layout>
    );
};

export default Write;