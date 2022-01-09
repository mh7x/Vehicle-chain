import React, { Component } from "react";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";
import Insurance from "../../../ethereum/insurance";
import { Button, Card, Segment } from 'semantic-ui-react';

class InsuranceInfo extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const contract = Insurance(address);
        // Address of manager -> the person who can enter data
        const manager = await contract.methods.manager().call();
        // Address of owner -> the person who can see private part of insurance
        const owner = await contract.methods.owner().call();
        // Number of public entries
        const publicCount = await contract.methods.getPublicCount().call();
        // Public entries
        const publicInsurance = await Promise.all(
            Array(parseInt(publicCount))
                .fill()
                .map((element, index) => {
                    return contract.methods.publicInsurances(index).call();
                })
        )

        return { address, manager, owner, publicCount, publicInsurance };
    }

    renderCards() {
        const {
            manager,
            owner,
        } = this.props;

        const items = [
            {
                header: manager,
                meta: "Address of Manager",
                description: "The manager created this contract and can enter services",
                style: { overflowWrap: "break-word" }
            },
            {
                header: owner,
                meta: "Address of owner",
                description: "The owner can see public and private part of insurance",
                style: { overflowWrap: "break-word" }
            }
        ]

        return <Card.Group items={items} />;
    }

    renderPublicInfo() {
        return this.props.publicInsurance.map((insurance, index) => {
            return (
                <Segment key={index}>{insurance}</Segment>
            )
        })
    }

    render() {
        return (
            <Layout>
                <h2>Car insurance info</h2>

                <Link route={"/contracts/insurance"} >
                    <Button primary floated="right" content="Back" />
                </Link>
                <h3>Car address: {this.props.address}</h3>

                {this.renderCards()}

                <Segment.Group raised style={{ marginTop: 20 }}>
                    <Segment color="blue" as="h1" size="huge">Public insurances: </Segment>
                    {this.renderPublicInfo()}
                </Segment.Group>

                <Link route={`/contracts/insurance/${this.props.address}/private`}>
                    <Button color="red" style={{ marginTop: 20, marginBottom: 20 }} content="View private part" />
                </Link>

                <Link route={`/contracts/insurance/${this.props.address}/entry`}>
                    <Button primary style={{ marginTop: 20, marginBottom: 20 }} content="Update insurance" />
                </Link>
            </Layout>
        );
    }

}

export default InsuranceInfo;
