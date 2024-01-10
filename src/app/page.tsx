"use client";
import Image from "next/image";

//Hooks - Fica mais fácil de identificar hooks se pensar que todos começam com a palavra use
import React, { useState, useEffect } from "react";

export default function Home() {
  //O useState: serve para definir o estado inicial de um componente
  //sempre que uma váriavel for alterada, o componente é renderizado novamente
  //pois o useState irá notificar o React que o estado do componente foi alterado,
  //e o React irá renderizar o componente novamente

  //objeto que vamos utilizar para armazenar os repositórios
  //que vamos obter da API do Github
  //Com ele vamos definir o estado inicial do nosso componente
  const [repositorios, definirRepositorios] = useState<
    {
      id: number;
      name: string;
      owner: {
        login: string;
        avatar_url: string;
      };
      html_url: string;
    }[]
  >([]);

  //useEffect: serve para executar uma função sempre que um componente for renderizado
  //ou quando um estado for alterado
  //o useEffect recebe dois parâmetros, o primeiro é a função que será executada
  //e o segundo é um array de dependências, ou seja, quando o estado que estiver
  //dentro do array for alterado, a função será executada novamente

  useEffect(
    /*Primeiro*/
    () => {
      async function ObterRepositorios() {
        const response = await fetch(
          "https://api.github.com/users/nathanaeldelfino/repos"
        );
        const data = await response.json();

        definirRepositorios(data);
      }

      ObterRepositorios();
    },
    /*Segundo*/
    []
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold text-center">
        Usando hooks do React com TypeScript no Github
      </h1>

      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold">Repositórios</h2>

        <ul className="flex flex-col items-center gap-1">
          {repositorios.map((repositorio) => {
            return (
              <li
                key={repositorio.name}
                className="flex flex-row items-center w-full p-4 m-4 h-48 border border-gray-400 rounded-lg"
              >
                {/* <div className="flex flex-col items-center">
                  <Image
                    src={repositorio.owner.avatar_url}
                    alt={repositorio.owner.login}
                    width={100}
                    height={100}
                  />
                  <span className="text-xl font-bold">
                    {repositorio.owner.login}
                  </span>
                </div> */}
                <div className="flex flex-1 flex-col items-center">
                  <span className="text-xl font-bold">{repositorio.name}</span>
                  <a href={repositorio.html_url} className="text-xl font-bold">
                    Acessar
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
