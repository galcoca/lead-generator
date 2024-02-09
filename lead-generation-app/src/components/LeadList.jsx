// LeadList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

var dataExists = false;

const LeadList = () => {
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        fetchLeads();
    });

    const fetchLeads = async () => {
        try {
            const response = await axios.get('http://localhost:3001/getleads');
            dataExists = true;
            setLeads(response.data);
        } catch (error) {
            console.error('Error fetching leads:', error);
        }
    };

    if (dataExists) {
        return (
            <React.Fragment>
                <Header />
                <div className="LeadList">
                    <h1>Lead List</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>E-Mail</th>
                                <th>Phone</th>
                                <th>Message</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead) => (
                                <tr key={lead.id}>
                                    <td>{lead.firstname}</td>
                                    <td>{lead.lastname}</td>
                                    <td>{lead.email}</td>
                                    <td>{lead.phone}</td>
                                    <td>{lead.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Footer />
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <Header />
                <div className="leadList">
                    <h1>Lead List</h1>
                    <span>Unable to retrieve data or data doesn't exists</span>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
};

export default LeadList;
