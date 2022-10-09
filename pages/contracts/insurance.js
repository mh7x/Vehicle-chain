import React, { Component } from "react"
import Layout from '../../components/Layout'
import { Link, Router } from '../../routes'
import web3 from "../../ethereum/web3"
import insuranceFactory from '../../ethereum/insuranceFactory'
import { Card, Button, Form, Message } from "semantic-ui-react"


class InsuranceIndex extends Component {
    state = {
        loading: false,
        errorMessage: '',
        successMessage: ''
    }

    static async getInitialProps() {
        const insuranceContracts = await insuranceFactory.methods.getDeployedInsurances().call();
        return { insuranceContracts: insuranceContracts }
    }

    renderInsuranceContracts() {
        const item = this.props.insuranceContracts.map(address => {
            return {
                header: "Car address: " + address,
                description: (
                    <Link route={`/contracts/insurance/${address}`} >
                        <a>View details {'>'}</a>
                    </Link>
                ),
                fluid: true
            }
        })

        return <Card.Group items={item} />;
    }

    render() {
        return (
            <Layout>
                <h2>Insurance contract index page</h2>
                <Link route={"/"}>
                    <Button primary floated="right" content="Back" />
                </Link>
                <h3>Open insurance contracts</h3>
                {this.renderInsuranceContracts()}
                <Link route={"/contracts/insurance/new"} >
                    <a>
                        <Button primary style={{ marginTop: 20 }} content="New contract" />
                    </a>
                </Link>
            </Layout>
        );
    }
}

export default InsuranceIndex;
