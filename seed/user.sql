create table profiles (
    id uuid primary key default gen_random_uuid(),
    full_name text,
    email text unique not null,
    education_level text,
    experience_level text,
    key_skills text[],
    professional_interests text,
    career_goals text,
    about_you text,
    created_at timestamp with time zone default now()
);
