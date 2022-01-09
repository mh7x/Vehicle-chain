import React, { Component } from "react"
import Layout from '../../components/Layout'
import { Link, Router } from '../../routes'
import web3 from "../../ethereum/web3"
import serviceFactory from '../../ethereum/serviceFactory'
import { Card, Button, Form, Message } from "semantic-ui-react"


class ServiceIndex extends Component {
    state = {
        loading: false,
        errorMessage: '',
        successMessage: ''
    }

    static async getInitialProps() {
        const serviceContracts = await serviceFactory.methods.getDeployedServices().call();
        return { serviceContracts: serviceContracts }
    }

    renderServiceContracts() {
        const item = this.props.serviceContracts.map(address => {
            return {
                header: "Car address: " + address,
                description: (
                    <Link route={`/contracts/service/${address}`} >
                        <a>View details {'>'}</a>
                    </Link>
                ),
                fluid: true
            }
        })

        return <Card.Group items={item} />;
    }
    
    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: "", successMessage: "" });

        try {
            const accounts = await web3.eth.getAccounts()
            await serviceFactory.methods
                .createService()
                .send({ from: accounts[0] });
            
            this.setState({ successMessage: "Service contract added successfully, please save the car address. Please refresh the page! "})
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }
        this.setState({ loading: false })
    }

    render() {
        return (
            <Layout>
                <h2>Service contract index page</h2>
                <Link route={"/"}>
                    <Button primary floated="right" content="Back" />
                </Link>
                <h3>Open service contracts</h3>
                {this.renderServiceContracts()}
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} success={!!this.state.successMessage}>
                    <Button primary style={{ marginTop: 20 }} content="New contract" loading={this.state.loading} />
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Message success header="Success!" content={this.state.successMessage} />
                </Form>
            </Layout>
        );
    }
}

export default ServiceIndex;
