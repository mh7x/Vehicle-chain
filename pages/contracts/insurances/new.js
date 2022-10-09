import React, { Component } from 'react'
import Layout from '../../../components/Layout'
import web3 from '../../../ethereum/web3'
import insuranceFactory from '../../../ethereum/insuranceFactory'
import { Link, Router } from '../../../routes'
import { Button, Form, Input, Message } from 'semantic-ui-react'

class InsuranceNew extends Component {
    state = {
        address: '',
        public: true,
        loading: false,
        errorMessage: ''
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const owner = this.state.address

        this.setState({ loading: true, errorMessage: "", successMessage: "" });

        try {
            const accounts = await web3.eth.getAccounts()
            await insuranceFactory.methods
                .createInsurance(owner)
                .send({ from: accounts[0] });
            Router.pushRoute(`/contracts/insurance/`)
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }
        this.setState({ loading: false })

    }

    render() {
        return (
            <Layout>
                <h2>Enter new insurance owner</h2>
                <Link route={`/contracts/insurance/`}>
                    <Button primary floated="right" content="Back" />
                </Link>
                <h3>Create new insurance</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Owner address</label>
                        <Input value={this.state.address} onChange={event => this.setState({ address: event.target.value })} />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>Add!</Button>
                </Form>
            </Layout>
        )
    }
}

export default InsuranceNew;