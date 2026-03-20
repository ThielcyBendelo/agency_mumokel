import React from 'react';
import { motion } from 'framer-motion';

const MotionH2 = motion.h2;
const MotionDiv = motion.div;

const technologies = [
  {
    name: 'React',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTE4IiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDExOCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTgiIGhlaWdodD0iMTAwIiBmaWxsPSIjNjFEREFCIi8+CjxwYXRoIGQ9Ik0xMTYuNTU5IDUwQzExNi41NTkgNzYuNzI5IDEwMC4yOSA5My4wODMgNzMuODM5IDkzLjA4M0M1MC4wODMgOTMuMDgzIDIzLjcyOSA3Ni43MjkgMjMuNzI5IDUwQzIzLjcyOSA0My4yNzEgMzkuOTE3IDI3LjA4MyA1MC4wODMgMjcuMDgzQzYwLjI0OSAyNy4wODMgNzYuNTI5IDQzLjI3MSA3Ni41MjkgNTBDNzYuNTI5IDU2LjcyOSA2MC4yNDkgNzIuOTE3IDUwLjA4MyA3Mi45MTdDNDMuOTE3IDcyLjkxNyAyNy43MjkgNTYuNzI5IDI3LjcyOSA1MFoiIGZpbGw9IiMwMUI5RjYiLz4KPHBhdGggZD0iTTc2LjUyOSA1MEM3Ni41MjkgNjUuNDI5IDY5LjQyOSA3Mi41MjkgNTAgNzIuNTI5QzMwLjU3MSA3Mi41MjkgMjMuNDcxIDY1LjQyOSAyMy40NzEgNTBDMjMuNDcxIDM0LjU3MSAzMC41NzEgMjcuNDcxIDUwIDI3LjQ3MUM2OS40MjkgMjcuNDcxIDc2LjUyOSA0NC41NzEgNzYuNTI5IDUwWiIgZmlsbD0iIzYxREFBQiIvPgo8cGF0aCBkPSJNNzYuNTI5IDUwQzc2LjUyOSA2NS40MjkgNjkuNDI5IDcyLjUyOSA1MCA3Mi41MjljLTE5LjQyOSAwLTI2LjUyOS02LjQyOS0yNi41MjktMTcuNTI5QzIzLjQ3MSAzNC41NzEgMzAuNTcxIDI3LjQ3MSA1MCAyNy40NzFjMTkuNDI5IDAgMjYuNTI5IDYuNDI5IDI2LjUyOSAxNy41MjlaIiBmaWxsPSIjMjEyMzI0Ii8+Cjwvc3ZnPgo=',
    description:
      'Librairie JavaScript pour créer des interfaces utilisateur dynamiques et performantes.',
    level: 'Expert',
  },
  {
    name: 'Node.js',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTE4IiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDExOCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTgiIGhlaWdodD0iMTAwIiBmaWxsPSIjMzM0MzM0Ii8+CjxwYXRoIGQ9Ik0xMTYuNTU5IDUwQzExNi41NTkgNzYuNzI5IDEwMC4yOSA5My4wODMgNzMuODM5IDkzLjA4M0M1MC4wODMgOTMuMDgzIDIzLjcyOSA3Ni43MjkgMjMuNzI5IDUwQzIzLjcyOSA0My4yNzEgMzkuOTE3IDI3LjA4MyA1MC4wODMgMjcuMDgzQzYwLjI0OSAyNy4wODMgNzYuNTI5IDQzLjI3MSA3Ni41MjkgNTBDNzYuNTI5IDU2LjcyOSA2MC4yNDkgNzIuOTE3IDUwLjA4MyA3Mi45MTdDNDMuOTE3IDcyLjkxNyAyNy43MjkgNTYuNzI5IDI3LjcyOSA1MFoiIGZpbGw9IiM4M0NEMEYiLz4KPHBhdGggZD0iTTc2LjUyOSA1MEM3Ni41MjkgNjUuNDI5IDY5LjQyOSA3Mi41MjkgNTAgNzIuNTI5QzMwLjU3MSA3Mi41MjkgMjMuNDcxIDY1LjQyOSAyMy40NzEgNTBDMjMuNDcxIDM0LjU3MSAzMC41NzEgMjcuNDcxIDUwIDI3LjQ3MUM2OS40MjkgMjcuNDcxIDc2LjUyOSA0NC41NzEgNzYuNTI5IDUwWiIgZmlsbD0iIzMzNDMzNCIvPgo8cGF0aCBkPSJNNzYuNTI5IDUwQzc2LjUyOSA2NS40MjkgNjkuNDI5IDcyLjUyOSA1MCA3Mi41MjljLTE5LjQyOSAwLTI2LjUyOS02LjQyOS0yNi41MjktMTcuNTI5QzIzLjQ3MSAzNC41NzEgMzAuNTcxIDI3LjQ3MSA1MCAyNy40NzFjMTkuNDI5IDAgMjYuNTI5IDYuNDI5IDI2LjUyOSAxNy41MjlaIiBmaWxsPSIjODNDRDBGIi8+Cjwvc3ZnPgo=',
    description:
      'Plateforme backend rapide et scalable pour des APIs robustes et sécurisées.',
    level: 'Expert',
  },
  {
    name: 'MongoDB',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTE4IiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDExOCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTgiIGhlaWdodD0iMTAwIiBmaWxsPSIjNDc0QTQ4Ii8+CjxwYXRoIGQ9Ik0xMTYuNTU5IDUwQzExNi41NTkgNzYuNzI5IDEwMC4yOSA5My4wODMgNzMuODM5IDkzLjA4M0M1MC4wODMgOTMuMDgzIDIzLjcyOSA3Ni43MjkgMjMuNzI5IDUwQzIzLjcyOSA0My4yNzEgMzkuOTE3IDI3LjA4MyA1MC4wODMgMjcuMDgzQzYwLjI0OSAyNy4wODMgNzYuNTI5IDQzLjI3MSA3Ni41MjkgNTBDNzYuNTI5IDU2LjcyOSA2MC4yNDkgNzIuOTE3IDUwLjA4MyA3Mi45MTdDNDMuOTE3IDcyLjkxNyAyNy43MjkgNTYuNzI5IDI3LjcyOSA1MFoiIGZpbGw9IiM0RUE0NEEiLz4KPHBhdGggZD0iTTc2LjUyOSA1MEM3Ni41MjkgNjUuNDI5IDY5LjQyOSA3Mi41MjkgNTAgNzIuNTI5QzMwLjU3MSA3Mi41MjkgMjMuNDcxIDY1LjQyOSAyMy40NzEgNTBDMjMuNDcxIDM0LjU3MSAzMC41NzEgMjcuNDcxIDUwIDI3LjQ3MUM2OS40MjkgMjcuNDcxIDc2LjUyOSA0NC41NzEgNzYuNTI5IDUwWiIgZmlsbD0iIzQ3NEE0OCIvPgo8cGF0aCBkPSJNNzYuNTI5IDUwQzc2LjUyOSA2NS40MjkgNjkuNDI5IDcyLjUyOSA1MCA3Mi41MjljLTE5LjQyOSAwLTI2LjUyOS02LjQyOS0yNi41MjktMTcuNTI5QzIzLjQ3MSAzNC41NzEgMzAuNTcxIDI3LjQ3MSA1MCAyNy40NzFjMTkuNDI5IDAgMjYuNTI5IDYuNDI5IDI2LjUyOSAxNy41MjlaIiBmaWxsPSIjNEVBNDRBIi8+Cjwvc3ZnPgo=',
    description:
      'Base de données NoSQL flexible et performante pour applications modernes.',
    level: 'Avancé',
  },
  {
    name: 'Express.js',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTE4IiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDExOCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTgiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDAwMDAwIi8+CjxwYXRoIGQ9Ik0xMTYuNTU5IDUwQzExNi41NTkgNzYuNzI5IDEwMC4yOSA5My4wODMgNzMuODM5IDkzLjA4M0M1MC4wODMgOTMuMDgzIDIzLjcyOSA3Ni43MjkgMjMuNzI5IDUwQzIzLjcyOSA0My4yNzEgMzkuOTE3IDI3LjA4MyA1MC4wODMgMjcuMDgzQzYwLjI0OSAyNy4wODMgNzYuNTI5IDQzLjI3MSA3Ni41MjkgNTBDNzYuNTI5IDU2LjcyOSA2MC4yNDkgNzIuOTE3IDUwLjA4MyA3Mi45MTdDNDMuOTE3IDcyLjkxNyAyNy43MjkgNTYuNzI5IDI3LjcyOSA1MFoiIGZpbGw9IiMwMDAwMDAiLz4KPHBhdGggZD0iTTc2LjUyOSA1MEM3Ni41MjkgNjUuNDI5IDY5LjQyOSA3Mi41MjkgNTAgNzIuNTI5QzMwLjU3MSA3Mi41MjkgMjMuNDcxIDY1LjQyOSAyMy40NzEgNTBDMjMuNDcxIDM0LjU3MSAzMC41NzEgMjcuNDcxIDUwIDI3LjQ3MUM2OS40MjkgMjcuNDcxIDc2LjUyOSA0NC41NzEgNzYuNTI5IDUwWiIgZmlsbD0iIzAwMDAwMCIvPgo8cGF0aCBkPSJNNzYuNTI5IDUwQzc2LjUyOSA2NS40MjkgNjkuNDI5IDcyLjUyOSA1MCA3Mi41MjljLTE5LjQyOSAwLTI2LjUyOS02LjQyOS0yNi41MjktMTcuNTI5QzIzLjQ3MSAzNC41NzEgMzAuNTcxIDI3LjQ3MSA1MCAyNy40NzFjMTkuNDI5IDAgMjYuNTI5IDYuNDI5IDI2LjUyOSAxNy41MjlaIiBmaWxsPSIjMDAwMDAwIi8+Cjwvc3ZnPgo=',
    description:
      'Framework web minimaliste pour Node.js, rapide et flexible.',
    level: 'Expert',
  },
  {
    name: 'Docker',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTE4IiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDExOCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTgiIGhlaWdodD0iMTAwIiBmaWxsPSIjMjQ5NkVEIi8+CjxwYXRoIGQ9Ik0xMTYuNTU5IDUwQzExNi41NTkgNzYuNzI5IDEwMC4yOSA5My4wODMgNzMuODM5IDkzLjA4M0M1MC4wODMgOTMuMDgzIDIzLjcyOSA3Ni43MjkgMjMuNzI5IDUwQzIzLjcyOSA0My4yNzEgMzkuOTE3IDI3LjA4MyA1MC4wODMgMjcuMDgzQzYwLjI0OSAyNy4wODMgNzYuNTI5IDQzLjI3MSA3Ni41MjkgNTBDNzYuNTI5IDU2LjcyOSA2MC4yNDkgNzIuOTE3IDUwLjA4MyA3Mi45MTdDNDMuOTE3IDcyLjkxNyAyNy43MjkgNTYuNzI5IDI3LjcyOSA1MFoiIGZpbGw9IiMyNDk2RUQiLz4KPHBhdGggZD0iTTc2LjUyOSA1MEM3Ni41MjkgNjUuNDI5IDY5LjQyOSA3Mi41MjkgNTAgNzIuNTI5QzMwLjU3MSA3Mi41MjkgMjMuNDcxIDY1LjQyOSAyMy40NzEgNTBDMjMuNDcxIDM0LjU3MSAzMC41NzEgMjcuNDcxIDUwIDI3LjQ3MUM2OS40MjkgMjcuNDcxIDc2LjUyOSA0NC41NzEgNzYuNTI5IDUwWiIgZmlsbD0iIzI0OTZFRCIvPgo8cGF0aCBkPSJNNzYuNTI5IDUwQzc2LjUyOSA2NS40MjkgNjkuNDI5IDcyLjUyOSA1MCA3Mi41MjljLTE5LjQyOSAwLTI2LjUyOS02LjQyOS0yNi41MjktMTcuNTI5QzIzLjQ3MSAzNC41NzEgMzAuNTcxIDI3LjQ3MSA1MCAyNy40NzFjMTkuNDI5IDAgMjYuNTI5IDYuNDI5IDI2LjUyOSAxNy41MjlaIiBmaWxsPSIjMjQ5NkVEIi8+Cjwvc3ZnPgo=',
    description:
      'Conteneurisation et déploiement simplifié pour des applications modernes.',
    level: 'Avancé',
  },
  {
    name: 'AWS',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTE4IiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDExOCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTgiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkY5OTAwIi8+CjxwYXRoIGQ9Ik0xMTYuNTU5IDUwQzExNi41NTkgNzYuNzI5IDEwMC4yOSA5My4wODMgNzMuODM5IDkzLjA4M0M1MC4wODMgOTMuMDgzIDIzLjcyOSA3Ni43MjkgMjMuNzI5IDUwQzIzLjcyOSA0My4yNzEgMzkuOTE3IDI3LjA4MyA1MC4wODMgMjcuMDgzQzYwLjI0OSAyNy4wODMgNzYuNTI5IDQzLjI3MSA3Ni41MjkgNTBDNzYuNTI5IDU2LjcyOSA2MC4yNDkgNzIuOTE3IDUwLjA4MyA3Mi45MTdDNDMuOTE3IDcyLjkxNyAyNy43MjkgNTYuNzI5IDI3LjcyOSA1MFoiIGZpbGw9IiNGRjk5MDAiLz4KPHBhdGggZD0iTTc2LjUyOSA1MEM3Ni41MjkgNjUuNDI5IDY5LjQyOSA3Mi41MjkgNTAgNzIuNTI5QzMwLjU3MSA3Mi41MjkgMjMuNDcxIDY1LjQyOSAyMy40NzEgNTBDMjMuNDcxIDM0LjU3MSAzMC41NzEgMjcuNDcxIDUwIDI3LjQ3MUM2OS40MjkgMjcuNDcxIDc2LjUyOSA0NC41NzEgNzYuNTI5IDUwWiIgZmlsbD0iI0ZGOUIwMCIvPgo8cGF0aCBkPSJNNzYuNTI5IDUwQzc2LjUyOSA2NS40MjkgNjkuNDI5IDcyLjUyOSA1MCA3Mi41MjljLTE5LjQyOSAwLTI2LjUyOS02LjQyOS0yNi41MjktMTcuNTI5QzIzLjQ3MSAzNC41NzEgMzAuNTcxIDI3LjQ3MSA1MCAyNy40NzFjMTkuNDI5IDAgMjYuNTI5IDYuNDI5IDI2LjUyOSAxNy41MjlaIiBmaWxsPSIjRkY5OTAwIi8+Cjwvc3ZnPgo=',
    description:
      'Cloud computing, hébergement sécurisé et scalabilité mondiale.',
    level: 'Intermédiaire',
  },
  {
    name: 'Tailwind CSS',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTE4IiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDExOCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTgiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDZCMkMxIi8+CjxwYXRoIGQ9Ik0xMTYuNTU5IDUwQzExNi41NTkgNzYuNzI5IDEwMC4yOSA5My4wODMgNzMuODM5IDkzLjA4M0M1MC4wODMgOTMuMDgzIDIzLjcyOSA3Ni43MjkgMjMuNzI5IDUwQzIzLjcyOSA0My4yNzEgMzkuOTE3IDI3LjA4MyA1MC4wODMgMjcuMDgzQzYwLjI0OSAyNy4wODMgNzYuNTI5IDQzLjI3MSA3Ni41MjkgNTBDNzYuNTI5IDU2LjcyOSA2MC4yNDkgNzIuOTE3IDUwLjA4MyA3Mi45MTdDNDMuOTE3IDcyLjkxNyAyNy43MjkgNTYuNzI5IDI3LjcyOSA1MFoiIGZpbGw9IiMwNkIyQzEiLz4KPHBhdGggZD0iTTc2LjUyOSA1MEM3Ni41MjkgNjUuNDI5IDY5LjQyOSA3Mi41MjkgNTAgNzIuNTI5QzMwLjU3MSA3Mi41MjkgMjMuNDcxIDY1LjQyOSAyMy40NzEgNTBDMjMuNDcxIDM0LjU3MSAzMC41NzEgMjcuNDcxIDUwIDI3LjQ3MUM2OS40MjkgMjcuNDcxIDc2LjUyOSA0NC41NzEgNzYuNTI5IDUwWiIgZmlsbD0iIzA2QjJDMSIvPgo8cGF0aCBkPSJNNzYuNTI5IDUwQzc2LjUyOSA2NS40MjkgNjkuNDI5IDcyLjUyOSA1MCA3Mi41MjljLTE5LjQyOSAwLTI2LjUyOS02LjQyOS0yNi41MjktMTcuNTI5QzIzLjQ3MSAzNC41NzEgMzAuNTcxIDI3LjQ3MSA1MCAyNy40NzFjMTkuNDI5IDAgMjYuNTI5IDYuNDI5IDI2LjUyOSAxNy41MjlaIiBmaWxsPSIjMDZCMkMxIi8+Cjwvc3ZnPgo=',
    description:
      'Framework CSS utilitaire pour des interfaces réactives et personnalisées.',
    level: 'Expert',
  },
  {
    name: 'TypeScript',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTE4IiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDExOCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTgiIGhlaWdodD0iMTAwIiBmaWxsPSIjMzE3OEM2Ii8+CjxwYXRoIGQ9Ik0xMTYuNTU5IDUwQzExNi41NTkgNzYuNzI5IDEwMC4yOSA5My4wODMgNzMuODM5IDkzLjA4M0M1MC4wODMgOTMuMDgzIDIzLjcyOSA3Ni43MjkgMjMuNzI5IDUwQzIzLjcyOSA0My4yNzEgMzkuOTE3IDI3LjA4MyA1MC4wODMgMjcuMDgzQzYwLjI0OSAyNy4wODMgNzYuNTI5IDQzLjI3MSA3Ni41MjkgNTBDNzYuNTI5IDU2LjcyOSA2MC4yNDkgNzIuOTE3IDUwLjA4MyA3Mi45MTdDNDMuOTE3IDcyLjkxNyAyNy43MjkgNTYuNzI5IDI3LjcyOSA1MFoiIGZpbGw9IiMzMTc4QzYiLz4KPHBhdGggZD0iTTc2LjUyOSA1MEM3Ni41MjkgNjUuNDI5IDY5LjQyOSA3Mi41MjkgNTAgNzIuNTI5QzMwLjU3MSA3Mi41MjkgMjMuNDcxIDY1LjQyOSAyMy40NzEgNTBDMjMuNDcxIDM0LjU3MSAzMC41NzEgMjcuNDcxIDUwIDI3LjQ3MUM2OS40MjkgMjcuNDcxIDc2LjUyOSA0NC41NzEgNzYuNTI5IDUwWiIgZmlsbD0iIzMxNzhDNiIvPgo8cGF0aCBkPSJNNzYuNTI5IDUwQzc2LjUyOSA2NS40MjkgNjkuNDI5IDcyLjUyOSA1MCA3Mi41MjljLTE5LjQyOSAwLTI2LjUyOS02LjQyOS0yNi41MjktMTcuNTI5QzIzLjQ3MSAzNC41NzEgMzAuNTcxIDI3LjQ3MSA1MCAyNy40NzFjMTkuNDI5IDAgMjYuNTI5IDYuNDI5IDI2LjUyOSAxNy41MjlaIiBmaWxsPSIjMzE3OEM2Ii8+Cjwvc3ZnPgo=',
    description:
      'Superset JavaScript typé pour un développement plus robuste.',
    level: 'Avancé',
  },
];
export default function TechnologiesSection() {
  return (
    <section
      className="py-16 px-4 bg-gradient-to-b from-gray-50 via-blue-50 to-white"
      id="technologies"
    >
      <div className="max-w-5xl mx-auto text-center">
          <MotionH2
            className="text-4xl font-extrabold text-blue-900 mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}
          >
            Technologies maîtrisées
          </MotionH2>
        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {technologies.map((tech, idx) => (
            <MotionDiv
              key={tech.name}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-blue-100 hover:shadow-2xl transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 + idx * 0.1, type: 'spring', stiffness: 120 }}
            >
              <img src={tech.logo} alt={tech.name} className="h-16 mb-4 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-bold text-blue-800 mb-2 group-hover:text-blue-600 transition-colors">{tech.name}</h3>
              <p className="text-gray-600 text-sm text-center mb-2 group-hover:text-gray-800 transition-colors">{tech.description}</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                tech.level === 'Expert' ? 'bg-green-100 text-green-800' :
                tech.level === 'Avancé' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {tech.level}
              </span>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
