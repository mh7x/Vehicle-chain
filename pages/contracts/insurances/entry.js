import React, { Component } from 'react'
import Layout from '../../../components/Layout'
import web3 from '../../../ethereum/web3'
import Insurance from '../../../ethereum/insurance'
import { Link, Router } from '../../../routes'
import { Button, Form, Input, Message } from 'semantic-ui-react'

class InsuranceEntry extends Component {
    state = {
        description: '',
        public: true,
        loading: false,
        errorMessage: ''
    }

    static async getInitialProps(props) {
        const { address } = props.query;

        return { address }
    }

    onSubmit = async (event) => {
        event.preventDefault();
        
        const contract = Insurance(this.props.address);
        const { description } = this.state;

        this.setState({ errorMessage: '', loading: true });

        try {
            const accounts = await web3.eth.getAccounts();
            if (this.state.public === true) {
                await contract.methods.enterPublic(description).send({ from: accounts[0] })
            } else {
                await contract.methods.enterPrivate(description).send({ from: accounts[0] })
            }
            Router.pushRoute(`/contracts/insurance/${this.props.address}`)
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false })
    }

    render() {
        return (
            <Layout>
                <h2>Enter new insurance part</h2>
                <Link route={`/contracts/service/${this.props.address}`}>
                    <Button primary floated="right" content="Back" />
                </Link>
                <h3>Insurance manager can enter new insurance details of a car</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Insurance description</label>
                        <Input value={this.state.description} onChange={event => this.setState({ description: event.target.value })} />
                    </Form.Field>
                    <Form.Group grouped>
                        <label>Add to public or private part?</label>
                        <Form.Field
                            label='Public'
                            control='input'
                            type='radio'
                            name='htmlRadios'
                            checked
                            onChange={event => this.setState({ public: true })}
                        />
                        <Form.Field
                            label='Private'
                            control='input'
                            type='radio'
                            name='htmlRadios'
                            onChange={event => this.setState({ public: false })}
                        />
                    </Form.Group>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>Add!</Button>
                </Form>
            </Layout>
        )
    }
}

export default InsuranceEntry;