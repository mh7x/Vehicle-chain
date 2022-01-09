import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';

const Layout = (props) => {
    return (
        <Container style={{ marginTop: 20 }}>
            <Head>
                <link async rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css" />
                <script src="https://cdn.jsdelivr.net/npm/semantic-ui-react/dist/umd/semantic-ui-react.min.js"></script>
                <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
                <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
                <script src="https://unpkg.com/prop-types/prop-types.min.js"></script>
                <script src="https://unpkg.com/recharts/umd/Recharts.js"></script>
            </Head>
            {props.children}
        </Container>
    );
};

export default Layout;