import React, { Component } from "react";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";
import Mileage from "../../../ethereum/mileage";
import { Button, Card, Table } from 'semantic-ui-react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

class MileageInfo extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const contract = Mileage(address);
        // Address of manager -> the person who can enter data
        const manager = await contract.methods.manager().call();
        // Number of entries
        const mileagesCount = await contract.methods.getMileagesCount().call();
        // Last entered mileage
        const lastMileage = await contract.methods.diffMileages(mileagesCount - 1).call();
        // Entries per year
        const diffMileages = await Promise.all(
            Array(parseInt(mileagesCount))
                .fill()
                .map((element, index) => {
                    return contract.methods.diffMileages(index).call();
                })
        )
        // Total mileage
        const totalMileage = await contract.methods.totalMileage().call();
        // Total mileages per year
        const totalMileages = await Promise.all(
            Array(parseInt(mileagesCount))
                .fill()
                .map((element, index) => {
                    return contract.methods.totalMileages(index).call();
                })
        )
        
        return { address, manager, mileagesCount, lastMileage, diffMileages, totalMileage, totalMileages };
    }

    renderCards() {
        const {
            manager,
            lastMileage,
            totalMileage
        } = this.props;

        const items = [
            {
                header: manager,
                meta: "Address of Manager",
                description: "The manager created this contract and can enter mileages yearly",
                style: { overflowWrap: "break-word" }
            },
            {
                header: totalMileage,
                meta: "Mileage",
                description: "Total mileage of a car"
            },
            {
                header: lastMileage,
                meta: "Last mileage",
                description: "Last mileage entry of yearly inspection"
            }
        ]

        return <Card.Group items={items} />;
    }

    renderRows() {
        const diffMileages = this.props.diffMileages
        return this.props.totalMileages.map((mileage, index) => {
            return (
                <Table.Row key={index}>
                    <Table.Cell>{index}</Table.Cell>
                    <Table.Cell>{mileage}</Table.Cell>
                    <Table.Cell>{diffMileages[index]}</Table.Cell>
                </Table.Row>
            )
        })
    }

    setGraphData() {
        const data = [];
        for (let i = 0; i < this.props.mileagesCount; i++) {
            data[i] = {
                index: i,
                mileage: this.props.totalMileages[i]
            }
        }
        return data;
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
                <h2>Car milage info</h2>

                <Link route={"/contracts/mileage"} >
                    <Button primary floated="right" content="Back" />
                </Link>
                <h3>Car address: {this.props.address}</h3>

                {this.renderCards()}

                <h3>Entries:</h3>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Mileage</HeaderCell>
                            <HeaderCell>Difference</HeaderCell>
                        </Row>
                    </Header>
                    <Body>{this.renderRows()}</Body>
                </Table>
                <div>Found {this.props.mileagesCount - 1} entries</div>

                <h3>Graph:</h3>
                <LineChart width={1000} height={300} data={this.setGraphData()}>
                    <Line type="monotone" dataKey="mileage" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="index" />
                    <YAxis domain={[0, parseInt(this.props.totalMileage)]} />
                    <Tooltip />
                </LineChart>

                <Link route={`/contracts/mileage/${this.props.address}/entry`}>
                    <Button primary style={{ marginTop: 20, marginBottom: 20 }} content="Enter milage" />
                </Link>
            </Layout>
        );
    }

}

export default MileageInfo;
