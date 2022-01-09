import React, { Component } from 'react'
import Layout from '../../../components/Layout'
import web3 from '../../../ethereum/web3'
import Service from '../../../ethereum/service'
import { Link, Router } from '../../../routes'
import { Button, Form, Input, Message } from 'semantic-ui-react'

class ServiceEntry extends Component {
    state = {
        description: '',
        loading: false,
        errorMessage: ''
    }

    static async getInitialProps(props) {
        const { address } = props.query;

        return { address }
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const contract = Service(this.props.address);
        const { description } = this.state;

        this.setState({ errorMessage: '', loading: true });

        try {
            const accounts = await web3.eth.getAccounts();
            await contract.methods.enterService(description).send({ from: accounts[0] })
            Router.pushRoute(`/contracts/service/${this.props.address}`)
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false})
    }

    render() {
        return (
            <Layout>
                <h2>Enter new service</h2>
                <Link route={`/contracts/service/${this.props.address}`}>
                    <Button primary floated="right" content="Back" />
                </Link>
                <h3>Manager can enter new service description of a car</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Service description</label>
                        <Input value={this.state.description} onChange={event => this.setState({ description: event.target.value })} />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>Enter!</Button>
                </Form>
            </Layout>
        )
    }
}

export default ServiceEntry;