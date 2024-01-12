"use client";
export interface GithubPropriedades {
  id: number;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
}
