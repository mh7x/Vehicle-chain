import React, { Component } from 'react'
import Layout from '../../../components/Layout'
import web3 from '../../../ethereum/web3'
import Mileage from '../../../ethereum/mileage'
import { Link, Router } from '../../../routes'
import { Button, Form, Input, Message } from 'semantic-ui-react'

class MileageEntry extends Component {
    state = {
        value: '',
        loading: false,
        errorMessage: ''
    }

    static async getInitialProps(props) {
        const { address } = props.query;

        return { address }
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const contract = Mileage(this.props.address);
        const { value } = this.state;

        this.setState({ errorMessage: '', loading: true });

        try {
            const accounts = await web3.eth.getAccounts();
            await contract.methods.enterMileage(value).send({ from: accounts[0] })
            Router.pushRoute(`/contracts/mileage/${this.props.address}`)
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false})
    }

    render() {
        return (
            <Layout>
                <h2>Enter new mileage</h2>
                <Link route={`/contracts/mileage/${this.props.address}`}>
                    <Button primary floated="right" content="Back" />
                </Link>
                <h3>Manager can enter new mileage at yearly inspection of a car</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Mileage value</label>
                        <Input label="km" labelPosition="right" value={this.state.value} onChange={event => this.setState({ value: event.target.value })} />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>Enter!</Button>
                </Form>
            </Layout>
        )
    }
}

export default MileageEntry;