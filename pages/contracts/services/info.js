import React, { Component } from "react";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";
import Service from "../../../ethereum/service";
import { Button, Card, Table } from 'semantic-ui-react';

class ServiceInfo extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const contract = Service(address);
        // Address of manager -> the person who can enter data
        const manager = await contract.methods.manager().call();
        // Number of entries
        const servicesCount = await contract.methods.getServicesCount().call();
        // Entries per year
        const services = await Promise.all(
            Array(parseInt(servicesCount))
                .fill()
                .map((element, index) => {
                    return contract.methods.services(index).call();
                })
        )
        
        return { address, manager, servicesCount, services };
    }

    renderCards() {
        const {
            manager,
            servicesCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: "Address of Manager",
                description: "The manager created this contract and can enter services",
                style: { overflowWrap: "break-word" }
            },
            {
                header: servicesCount,
                meta: "Number of entries",
                description: "Number of services that were entered by mechanic - manager"
            }
        ]

        return <Card.Group items={items} />;
    }

    renderRows() {
        return this.props.services.map((service, index) => {
            return (
                <Table.Row key={index}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{service}</Table.Cell>
                </Table.Row>
            )
        })
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
                <h2>Car milage info</h2>

                <Link route={"/contracts/service"} >
                    <Button primary floated="right" content="Back" />
                </Link>
                <h3>Car address: {this.props.address}</h3>

                {this.renderCards()}

                <h3>Entries:</h3>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Service description</HeaderCell>
                        </Row>
                    </Header>
                    <Body>{this.renderRows()}</Body>
                </Table>
                <div>Found {this.props.servicesCount} entries</div>

                <Link route={`/contracts/service/${this.props.address}/entry`}>
                    <Button primary style={{ marginTop: 20, marginBottom: 20 }} content="Enter milage" />
                </Link>
            </Layout>
        );
    }

}

export default ServiceInfo;
