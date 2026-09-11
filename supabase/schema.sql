-- Éditions Astres Noirs — schéma initial Supabase
-- À coller tel quel dans Supabase → SQL Editor → New query → Run.
-- Base pour la future application de gestion de la maison d'édition :
-- chaque auteur connecté (Google) ne voit et ne peut créer que ses propres manuscrits ;
-- l'équipe éditoriale consultera l'ensemble via le rôle admin (à mettre en place plus tard).

-- 1) Table des soumissions de manuscrits
create table if not exists manuscripts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  name text not null,
  email text not null,
  title text not null,
  genre text not null,
  message text not null,
  file_path text not null,
  status text not null default 'nouveau', -- nouveau | en lecture | accepté | refusé
  created_at timestamptz not null default now()
);

alter table manuscripts enable row level security;

drop policy if exists "Un auteur peut soumettre son propre manuscrit" on manuscripts;
create policy "Un auteur peut soumettre son propre manuscrit"
  on manuscripts for insert
  with check (auth.uid() = user_id);

drop policy if exists "Un auteur peut voir ses propres manuscrits" on manuscripts;
create policy "Un auteur peut voir ses propres manuscrits"
  on manuscripts for select
  using (auth.uid() = user_id);

-- 2) Espace de stockage pour les fichiers de manuscrits (privé)
insert into storage.buckets (id, name, public)
values ('manuscripts', 'manuscripts', false)
on conflict (id) do nothing;

drop policy if exists "Un auteur peut uploader dans son propre dossier" on storage.objects;
create policy "Un auteur peut uploader dans son propre dossier"
  on storage.objects for insert
  with check (bucket_id = 'manuscripts' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Un auteur peut lire ses propres fichiers" on storage.objects;
create policy "Un auteur peut lire ses propres fichiers"
  on storage.objects for select
  using (bucket_id = 'manuscripts' and (storage.foldername(name))[1] = auth.uid()::text);
