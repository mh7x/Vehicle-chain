import React, { Component } from "react";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";
import Insurance from "../../../ethereum/insurance";
import { Button, Card, Segment } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3'

class PrivateIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const contract = Insurance(address);
        // Address of manager -> the person who can enter data
        const manager = await contract.methods.manager().call();
        // Address of owner -> the person who can see private part of insurance
        const owner = await contract.methods.owner().call();
        // Number of private entries
        const privateCount = await contract.methods.getPrivateCount().call();
        // Private entries
        const accounts = await web3.eth.getAccounts();
        const privateInsurance = await contract.methods.getPrivate().call({ from: accounts[0] })

        return { address, manager, owner, privateCount, privateInsurance };
    }

    renderPrivateInfo() {
        return this.props.privateInsurance.map((insurance, index) => {
            return (
                <Segment key={index}>{insurance}</Segment>
            )
        })
    }

    render() {
        return (
            <Layout>
                <h2>Car private insurance info</h2>

                <Link route={`/contracts/insurance/${this.props.address}`} >
                    <Button color="red" floated="right" content="Back" />
                </Link>
                <h3>This section can be seen only by owner of the car or the insurance manager</h3>

                <Segment.Group raised style={{ marginTop: 20 }}>
                    <Segment color="red" as="h1" size="huge">Private insurances: </Segment>
                    {this.renderPrivateInfo()}
                </Segment.Group>

            </Layout>
        );
    }

}

export default PrivateIndex;
