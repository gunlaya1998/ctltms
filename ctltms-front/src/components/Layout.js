import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Sidebar from './Sidebar/Sidebar'

const Title = styled.div`
    font-family: 'Kanit';
    font-size: 1.25rem;
    font-weight: 500;
    padding: 1rem 1.625rem;
`

const Flex = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
`

const Layout = ({
    title= "Title"
}) => (
    <div>
        <Navbar />
        <Flex>
            <Sidebar />
            <Title>{title}</Title>
        </Flex>
        
    </div>
);

export default Layout;