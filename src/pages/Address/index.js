import React, { useState , useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';
import '../../global.css';
import logo from '../../assets/logo.png';

export default function Profile() {
    const [listUsers,setlistUsers]= useState([]);
    useEffect (()=>{

        const localStorageUsers = JSON.parse(localStorage.
            getItem('users'))
        if (localStorageUsers != null)
             setlistUsers(localStorageUsers)

    },[])
   
    
    return(
        <div className="profile-container">
            <header>
                <img src={ logo } alt="Nagem-List" />

                <input placeholder="Consultar pelo CPF" />
                <div>
                <Link className="button">Procurar</Link>
                
                <Link className="button" to="/">Cadastrar Novo</Link>
                </div>
            </header>
            
            <h1>Endereços Cadastrados</h1>

            <ul>

                 {listUsers.map((users,index) => (


                    <li key={users.cpf}>
                        <strong>DADOS DO ENDEREÇO: </strong>

                        <strong>
                        Nome: {users.endereco[index].name}, 
                        CPF: {users.endereco[index].cpf}, 
                        </strong>

                        <strong>
                        CEP: {users.endereco[index].cep}, 
                        RUA: {users.endereco[index].rua},
                        NUMERO: {users.endereco[index].numero},
                        BAIRRO: {users.endereco[index].bairro},
                        CIDADE: {users.endereco[index].cidade},
                        ESTADO: {users.endereco[index].uf}
                        </strong>

                        <strong>
                        CEP: {users.endereco[index].cep}, 
                        RUA: {users.endereco[index].rua},
                        NUMERO: {users.endereco[index].numero},
                        BAIRRO: {users.endereco[index].bairro},
                        CIDADE: {users.endereco[index].cidade},
                        ESTADO: {users.endereco[index].uf}
                        </strong>
                       
                        {/** 
                        <button onClick={() => {deleteUsers(users.cpf) }} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
                        </button>
                        */}
                    </li>

                ))}
            </ul>

        </div>
    );
}