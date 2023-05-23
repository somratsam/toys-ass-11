import React from 'react';
import { Accordion, Card, Container } from 'react-bootstrap';


const Blog = () => {
    return (
        <Container style={{ margin: '5rem' }}>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>1.  What is an access token and refresh token? How do they work and where should we store them on the client-side?</Accordion.Header>
                    <Accordion.Body>
                        An access token is a credential that is used to authenticate and authorize a client to access protected resources.
                        It is typically issued by an authentication server after a user successfully logs in or grants permission to an application.
                        The access token is then sent with each subsequent request to the server to access protected resources.
                        Refresh tokens, on the other hand, are used to obtain new access tokens when the existing one expires.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>2. Compare SQL and NoSQL databases?</Accordion.Header>
                    <Accordion.Body>
                    SQL databases, also known as relational databases, use structured query language (SQL) to define and manipulate data.
                    They have a predefined schema that defines the tables, columns, and relationships between the data.
                    SQL databases provide strong consistency, support ACID transactions, and are suitable for complex relationships and data integrity.
                    NoSQL databases, on the other hand, store data in a non-tabular format, such as key-value pairs, documents, or graphs.
                    They provide flexible schemas, horizontal scalability, and eventual consistency.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>3. What is Express.js? What is Nest.js?</Accordion.Header>
                    <Accordion.Body>
                    Express.js is a popular minimalistic web application framework for Node.js.
                    It provides a simple and flexible way to build web applications and APIs.
                    Express.js is known for its middleware system, which allows developers to extend the functionality of the framework.
                    It is widely used in the Node.js ecosystem and has a large number of plugins and extensions available.
                    Nest.js, on the other hand, is a progressive Node.js framework for building efficient, scalable, and maintainable server-side applications.
                    It is built with TypeScript and takes advantage of modern JavaScript features and design patterns.
                    Nest.js provides a modular architecture, dependency injection, and a powerful CLI for generating boilerplate code.
                    It is designed to be highly extensible and suitable for building large-scale applications.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>4.  What is MongoDB aggregate and how does it work?
                    </Accordion.Header>
                    <Accordion.Body>
                    MongoDB's aggregate is a powerful method for performing advanced data aggregation operations on collections.
                    It allows you to process and transform the data in various ways, such as grouping, filtering, sorting, and computing aggregate values.
                    The aggregation pipeline in MongoDB consists of multiple stages that are applied sequentially to the input documents.
                    Each stage performs a specific operation on the data and passes the result to the next stage.
                    The stages can include operations like `$match`, `$group`, `$sort`, `$project`, `$lookup`, and more.
                    The aggregate framework provides a flexible and efficient way to analyze and summarize data in MongoDB.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
};

export default Blog;
