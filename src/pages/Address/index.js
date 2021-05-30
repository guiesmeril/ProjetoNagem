import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';
import '../../global.css';
import logo from '../../assets/logo.png';

export default function Profile() {
    const [listUsers, setlistUsers] = useState([]);
    const [userSelected, setUserSelected] = useState('');
    const [user, setUser] = useState();
    const history = useHistory();


    useEffect(() => {
        const localStorageUsers = JSON.parse(localStorage.
            getItem('users'))
        if (localStorageUsers != null) {
            setlistUsers(localStorageUsers)
        }

    }, [])

    function buscarUser(e) {
        e.preventDefault();
        const user = listUsers.find(item => item.cpf == userSelected);
        if (!user) {
            return alert('Usuario não encontrado!')
        }
        setUser(user);

    }

    function deleteUser(cpf) {
        let newlistUsers = returnNewArrayUsers(cpf)
        setlistUsers(newlistUsers)
        localStorage.setItem('users', JSON.stringify(newlistUsers))
    }

    function returnNewArrayUsers(cpf) {
        return listUsers.filter(user => user.cpf !== cpf)
    }

    function resetPage() {
        setUser(undefined)
     }
 
    return(
        <div className="profile-container">
            <form onSubmit={buscarUser}>
            <header>
                <img src={ logo } alt="Nagem-List" />

                <input placeholder="Consultar pelo CPF"
                        name="cpf"
                        value={userSelected}
                        onChange={e => setUserSelected(e.target.value)} 
                />
                <div>
                <div>
                <button className="button" type="submit">Consultar</button>
                </div>
                <Link className="button" to="/">Cadastrar Novo</Link>
                </div>
            </header>

            </form>
            <h1>Endereços Cadastrados</h1>

            <button className="button2" onClick={() => { resetPage() }}>Recuperar Endereços</button>

            {user == undefined ?
                <ul>
                    {listUsers.map((user) => (
                        <li>
                            <strong>Nome:{user.name}</strong>
                            <br></br>
                            <strong>CPF:{user.cpf}</strong>
                            <br></br>
                            {user.endereco.map((endereco) =>
                                <div>
                                    <strong>CEP:{endereco.cep}</strong>
                                    <br></br>
                                    <strong>Rua:{endereco.rua}</strong>
                                    <br></br>
                                    <strong>Número:{endereco.numero}</strong>
                                    <br></br>
                                    <strong>Bairro:{endereco.bairro}</strong>
                                    <br></br>
                                    <strong>Cidade:{endereco.cidade}</strong>
                                    <br></br>
                                    <strong>Estado:{endereco.uf}</strong>
                                    <br></br>
                                </div>
                            )}
                            <button onClick={() => { deleteUser(user.cpf) }}>
                            <FiTrash2 size={20}  color="#a8a8b3"></FiTrash2>
                            </button>
                        </li>
                    ))}
                </ul>
                :
                <ul>
                    {
                        <li>
                            <strong>Nome:{user.name}</strong>
                            <br></br>
                            <strong>CPF:{user.cpf}</strong>
                            <br></br>
                            {user.endereco.map((endereco) =>
                                <div>
                                <div>
                                    <strong>CEP:{endereco.cep}</strong>
                                    <br></br>
                                    <strong>Rua:{endereco.rua}</strong>
                                    <br></br>
                                    <strong>Número:{endereco.numero}</strong>
                                    <br></br>
                                    <strong>Bairro:{endereco.bairro}</strong>
                                    <br></br>
                                    <strong>Cidade:{endereco.cidade}</strong>
                                    <br></br>
                                    <strong>Estado:{endereco.uf}</strong>
                                    <br></br>
                                </div>
                                </div>
                            )}
                            <button onClick={() => { deleteUser(user.cpf) }}>
                            <FiTrash2 size={20}  color="#a8a8b3"></FiTrash2>
                            </button>
                        </li>
                    }
                </ul>
            }

        </div>
    );
}