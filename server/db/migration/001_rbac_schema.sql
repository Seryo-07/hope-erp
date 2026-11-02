CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.role (
                                           id SERIAL PRIMARY KEY,
                                           name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

CREATE TABLE IF NOT EXISTS public.module (
                                             id SERIAL PRIMARY KEY,
                                             name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

CREATE TABLE IF NOT EXISTS public.rights_catalogue (
                                                       id SERIAL PRIMARY KEY,
                                                       module_id INT REFERENCES public.module(id) ON DELETE CASCADE,
    permission_key VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

CREATE TABLE IF NOT EXISTS public.app_user (
                                               id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role_id INT REFERENCES public.role(id) ON DELETE SET NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    is_blocked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

CREATE TABLE IF NOT EXISTS public.user_permission (
                                                      id SERIAL PRIMARY KEY,
                                                      user_id UUID REFERENCES public.app_user(id) ON DELETE CASCADE,
    rights_id INT REFERENCES public.rights_catalogue(id) ON DELETE CASCADE,
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
                                                                                                      );

ALTER TABLE public.app_user ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rights_catalogue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_permission ENABLE ROW LEVEL SECURITY;

INSERT INTO public.role (name, description) VALUES
                                                ('Admin', 'Full access to all system features'),
                                                ('Manager', 'Departmental management access'),
                                                ('Staff', 'Standard operational access')
    ON CONFLICT (name) DO NOTHING;