--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: animales; Type: TABLE; Schema: public; Owner: farm
--

CREATE TABLE public.animales (
    id integer NOT NULL,
    nombre text NOT NULL,
    especie text NOT NULL,
    fecha_nacimiento date,
    padre_id integer,
    madre_id integer,
    estado text DEFAULT 'alive'::text,
    observaciones text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    breed character varying(50),
    CONSTRAINT animales_estado_check CHECK ((estado = ANY (ARRAY['alive'::text, 'deceased'::text, 'under treatment'::text])))
);


ALTER TABLE public.animales OWNER TO farm;

--
-- Name: animales_id_seq; Type: SEQUENCE; Schema: public; Owner: farm
--

CREATE SEQUENCE public.animales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.animales_id_seq OWNER TO farm;

--
-- Name: animales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: farm
--

ALTER SEQUENCE public.animales_id_seq OWNED BY public.animales.id;


--
-- Name: animales id; Type: DEFAULT; Schema: public; Owner: farm
--

ALTER TABLE ONLY public.animales ALTER COLUMN id SET DEFAULT nextval('public.animales_id_seq'::regclass);


--
-- Data for Name: animales; Type: TABLE DATA; Schema: public; Owner: farm
--

COPY public.animales (id, nombre, especie, fecha_nacimiento, padre_id, madre_id, estado, observaciones, created_at, updated_at, breed) FROM stdin;
34	zocks	oveja	2023-03-13	0	0	deceased		2025-08-13 10:49:53.038743	2025-08-13 10:49:53.038743	\N
42	Bunny	oveja	2025-04-25	36	40	alive		2025-08-13 17:24:15.409614	2025-08-13 17:24:15.409614	East Ferisian
44	Little Horse	oveja	2025-03-12	18	41	alive		2025-08-13 17:26:06.964932	2025-08-13 17:26:06.964932	Jacob East-Ferisian
46	5024	oveja	2024-04-30	0	0	alive	#5024, 5/1/24, Dam: # 423/Sire: #3721, Single, White. \n83%EF + L, RA, PP. 	2025-08-13 17:32:06.674364	2025-08-13 17:32:06.674364	East Ferisian
45	Princess	oveja	2025-03-12	36	46	deceased	after 36 of brith dies of diarrhea	2025-08-13 17:29:56.549439	2025-08-13 17:33:13.202613	East Ferisian
47	Black1	oveja	2024-03-12	0	0	alive		2025-08-13 18:02:47.452936	2025-08-13 18:02:47.452936	Raka
48	Mario	oveja	2025-04-19	0	47	alive		2025-08-13 18:09:00.891034	2025-08-13 18:09:00.891034	Raka
50	Unicorn	oveja	2024-03-06	0	0	deceased	die of Hook Worm- medicine was given too late and/or underdose	2025-08-13 18:13:58.620839	2025-08-13 18:13:58.620839	Dragon
51	white dragon	oveja	2024-04-01	0	0	deceased	suspect die of plaing with Dakota when was still a puppy	2025-08-13 18:15:36.833216	2025-08-13 18:15:36.833216	Dragon
52	eyebrows	oveja	2024-04-01	0	0	deceased	vet outopsie said= sth stuck in her intestins 	2025-08-13 18:17:55.253313	2025-08-13 18:17:55.253313	Dragon
53	Futurama	oveja	2025-04-22	18	50	alive	was given worm medicine 0.4ml	2025-08-13 18:22:23.485932	2025-08-13 18:22:23.485932	Dragon
56	Chulky	oveja	2025-05-03	18	23	alive	twins	2025-08-13 18:30:58.592428	2025-08-13 18:30:58.592428	Jacob
59	Queen	oveja	2025-05-03	18	23	alive	4 Horns	2025-08-13 18:33:41.555577	2025-08-13 18:33:41.555577	Jacob
61	Black2	oveja	2024-04-01	0	0	alive		2025-08-13 18:35:39.94902	2025-08-13 18:35:39.94902	Raka
63	White old Raka	oveja	2018-04-01	0	0	alive		2025-08-13 18:37:18.7136	2025-08-13 18:37:18.7136	Raka
64	Black girl	oveja	2025-04-26	0	61	alive		2025-08-13 18:39:00.35317	2025-08-13 18:39:00.35317	Raka
65	Raka boy	oveja	2025-05-12	0	63	deceased	Was found on Saturday morning at 8 am.  He was alive but cold, couldn't move, he pee were he was laying.  He was crying from stomach pain. Was given peptobismo, vitamine B and painkiller. Suspect of worms or some block in his intestings. He Cry until he died at 10:30. am.	2025-08-13 18:47:03.406569	2025-08-13 18:47:03.406569	Raka
67	Cristal	oveja	2025-05-12	0	63	alive	She drinks  bottle	2025-08-13 18:48:25.419313	2025-08-13 18:48:25.419313	Raka
68	Big Tom	pavo	2023-01-03	0	0	alive		2025-08-13 19:06:25.149998	2025-08-13 19:06:25.149998	
21	Spoty	oveja	2023-04-08	\N	\N	alive		2025-08-09 10:13:15.214111	2025-08-11 13:45:13.949709	\N
18	Horny	oveja	2021-03-03	\N	\N	alive		2025-08-08 15:37:49.192606	2025-08-11 13:45:30.322355	\N
22	Lilipay	oveja	2023-03-15	\N	\N	alive		2025-08-09 10:45:46.339322	2025-08-09 10:45:46.339322	\N
23	Doddy	oveja	2023-04-25	\N	\N	alive		2025-08-09 10:58:34.799257	2025-08-09 10:58:34.799257	\N
30	Nimo	cabra	2025-06-12	25	26	alive		2025-08-13 10:14:54.933187	2025-08-15 18:49:35.327121	\N
49	Tom 	oveja	2025-04-20	18	19	alive		2025-08-13 18:10:36.697383	2025-08-15 18:51:44.557	Jacob
69	Twin1	cabra	2024-03-15	0	0	alive		2025-08-16 13:43:32.04219	2025-08-16 13:43:32.04219	
25	Peanuts	cabra	2024-04-01	0	0	alive		2025-08-13 09:39:59.825615	2025-08-13 09:39:59.825615	\N
26	Chiquitita	cabra	2024-05-07	0	0	alive		2025-08-13 10:03:35.513778	2025-08-13 10:03:35.513778	\N
31	Randy	oveja	2022-05-01	0	0	alive		2025-08-13 10:48:33.923212	2025-08-13 10:48:33.923212	\N
36	Herbert	oveja	2024-02-15	0	0	alive		2025-08-13 11:04:36.512737	2025-08-13 11:04:36.512737	\N
37	white1	oveja	2018-04-03	0	0	alive		2025-08-13 14:38:25.734586	2025-08-13 14:38:25.734586	\N
20	Oreo	oveja	2024-04-29	18	21	alive		2025-08-08 17:45:26.99166	2025-08-13 15:04:10.400851	Jacob
19	Flofy	oveja	2024-04-13	18	23	alive		2025-08-08 17:31:00.024335	2025-08-13 15:04:17.981437	Jacob
16	RamLamb	oveja	2024-03-04	18	22	alive		2025-08-08 11:55:23.939274	2025-08-13 15:04:23.823976	Jacob
38	Prince	oveja	2024-12-27	0	37	alive		2025-08-13 15:06:37.078146	2025-08-13 15:06:37.078146	Raka
24	Spiky	oveja	2025-03-08	18	21	alive	twin	2025-08-12 14:33:47.3305	2025-08-13 15:12:35.317419	Jacob
39	Spanky	oveja	2025-03-08	18	21	alive	twin	2025-08-13 15:11:58.533117	2025-08-13 15:12:42.719294	Jacob
17	Mili	oveja	2024-12-25	18	22	alive		2025-08-08 12:28:17.611663	2025-08-13 15:12:53.719539	jacob
35	toes	oveja	2025-02-02	31	34	alive	single	2025-08-13 11:02:37.924985	2025-08-13 15:13:11.787985	jacob
15	summer	oveja	2025-07-30	36	22	alive		2025-08-08 11:54:16.138166	2025-08-13 15:13:38.220796	Eastferisian-Jacob
40	324	oveja	2024-04-08	0	0	deceased	Dam: # 417/ Sire: #1023, Twin, White.\n85% East Friesian+ Lacaune, Rideau Arcott, Polypay. 	2025-08-13 16:56:57.700049	2025-08-13 16:56:57.700049	85% East Friesian
41	2524	oveja	2024-04-14	0	0	deceased	#2524, 4/15/24, Dam: #2021/Sire: #1023, Twin, White.\n85%EF+ L, RA, PP.	2025-08-13 16:58:09.771369	2025-08-13 16:58:09.771369	85%EF+ L
\.


--
-- Name: animales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: farm
--

SELECT pg_catalog.setval('public.animales_id_seq', 69, true);


--
-- Name: animales animales_pkey; Type: CONSTRAINT; Schema: public; Owner: farm
--

ALTER TABLE ONLY public.animales
    ADD CONSTRAINT animales_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

