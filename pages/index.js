import React, { Component } from 'react'
import Layout from '../components/Layout'
import { Link } from '../routes'
import { Button } from 'semantic-ui-react'

class AppIndex extends Component {

    render() {
        return (
            <Layout>
                <div style={{textAlign: "center"}}>
                    <h1>Pick a contract</h1>
                    <Link route="/contracts/insurance">
                        <a>
                            <Button
                                content="Insurance"
                                primary
                            />
                        </a>
                    </Link>
                    <Link route="/contracts/mileage">
                        <a>
                            <Button
                                content="Mileage"
                                primary
                            />
                        </a>
                    </Link>
                    <Link route="/contracts/service">
                        <a>
                            <Button
                                content="Service"
                                primary
                            />
                        </a>
                    </Link>
                </div>
            </Layout>
        )
    }

}

export default AppIndex;