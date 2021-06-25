import React, { Component } from 'react'
// import Layout from '../../components/Layout';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar'

const Title = styled.div`
    font-family: 'Kanit';
    font-size: 1.25rem;
    font-weight: 500;
    padding: 1rem 1.625rem;
`

const Flex = styled.div`
    display: flex;
    flex-direction: row;
`

export default class main extends Component {
    render(){
        return (
            <div>
                <Navbar />
                <Flex>
                    <Sidebar menuIndex={5} />
                    <Title>S05 - จัดการการจองรถ</Title>
                </Flex>
            </div>
        )
    }   
}