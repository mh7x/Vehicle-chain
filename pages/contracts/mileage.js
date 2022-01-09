import React, { Component, createFactory } from "react"
import { Card, Button, Form, Message } from "semantic-ui-react"
import Layout from '../../components/Layout'
import { Link } from '../../routes'
import web3 from "../../ethereum/web3"
import mileageFactory from '../../ethereum/mileageFactory'


class MileageIndex extends Component {
    state = {
        loading: false,
        errorMessage: '',
        successMessage: ''
    }

    static async getInitialProps() {
        const mileageContracts = await mileageFactory.methods.getDeployedMileages().call();
        return { mileageContracts: mileageContracts }
    }

    renderMileageContracts() {
        const item = this.props.mileageContracts.map(address => {
            return {
                header: "Car address: " + address,
                description: (
                    <Link route={`/contracts/mileage/${address}`} >
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
            await mileageFactory.methods
                .createMileage()
                .send({ from: accounts[0] });
            
            this.setState({ successMessage: "Mileage contract added successfully, please save the car address. Please refresh the page! "})
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }
        this.setState({ loading: false })
    }

    render() {
        return (
            <Layout>
                <h2>Mileage contract index page</h2>
                <Link route={"/"}>
                    <Button primary floated="right" content="Back" />
                </Link>
                <h3>Open mileage contracts</h3>
                {this.renderMileageContracts()}
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} success={!!this.state.successMessage}>
                    <Button primary style={{ marginTop: 20 }} content="New contract" loading={this.state.loading} />
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Message success header="Success!" content={this.state.successMessage} />
                </Form>
            </Layout>
        );
    }
}

export default MileageIndex;
