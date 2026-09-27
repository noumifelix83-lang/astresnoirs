-- Éditions Astres Noirs — étape 2 : équipe éditoriale, statuts et sécurité
-- À coller tel quel dans Supabase → SQL Editor → New query → Run.
-- Peut être relancé sans risque (idempotent).

-- 1) Liste des membres de l'équipe éditoriale (identifiés par leur e-mail Google)
create table if not exists staff (
  email text primary key,
  role text not null default 'editor',
  created_at timestamptz not null default now()
);

-- La table n'est lisible par personne côté navigateur : seule la fonction
-- ci-dessous (is_staff) sait dire si l'utilisateur connecté en fait partie.
alter table staff enable row level security;

insert into staff (email) values
  ('noumifelix83@gmail.com'),
  ('aastresnoirs@gmail.com')
on conflict (email) do nothing;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from staff
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- 2) Statuts autorisés + date de dernière mise à jour
alter table manuscripts add column if not exists updated_at timestamptz not null default now();

alter table manuscripts drop constraint if exists manuscripts_status_check;
alter table manuscripts
  add constraint manuscripts_status_check
  check (status in ('nouveau', 'en lecture', 'accepté', 'refusé'));

-- 3) Un auteur ne peut créer un manuscrit que pour lui-même ET au statut « nouveau »
--    (il ne peut plus se déclarer « accepté » tout seul)
drop policy if exists "Un auteur peut soumettre son propre manuscrit" on manuscripts;
create policy "Un auteur peut soumettre son propre manuscrit"
  on manuscripts for insert
  with check (auth.uid() = user_id and status = 'nouveau');

-- 4) L'équipe éditoriale voit et fait avancer tous les manuscrits
drop policy if exists "L'équipe lit tous les manuscrits" on manuscripts;
create policy "L'équipe lit tous les manuscrits"
  on manuscripts for select
  using (public.is_staff());

drop policy if exists "L'équipe met à jour les manuscrits" on manuscripts;
create policy "L'équipe met à jour les manuscrits"
  on manuscripts for update
  using (public.is_staff())
  with check (public.is_staff());

-- 5) L'équipe peut ouvrir tous les fichiers de manuscrits
drop policy if exists "L'équipe lit tous les fichiers" on storage.objects;
create policy "L'équipe lit tous les fichiers"
  on storage.objects for select
  using (bucket_id = 'manuscripts' and public.is_staff());
