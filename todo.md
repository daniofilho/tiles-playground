# Etapas

- Passar o projeto para Electron / atualizar dependências

- Já deixar pronto a lib para tradução do jogo

- Criar useGame para salvar os estados do jogo : deixar em states separados para evitar rerender

```typescript
type ElementType = {
  id: "wind" | "iron" | "light" | "adefinir-demais-elementos";
  label: string;
  image: string;
};

type ItemType = {
  id: "boot" | "sword" | "shield" | "teleport" | "totem";
  label: string;
  image: string;
  action: "walk" | "fight" | "teleport" | "open-boss-portal";
};

type TileType = {
  id: number;
  coordinates: any; //a definir
  type: "hidden" | "empty" | "nest" | "trap" | "objective" | "stair"; // hidden, tile que não foi aberto ainda
  stairTo: number; // TILEID onde será possível "se teleportar"
};

type LevelType = {
  id: number; // 1 a x, de acordo com o nível
  library: any; // "Pilha" de tiles restantes para serem sorteados nesse nível
  tiles: Array<TileType>; // Todos os tiles pré inicializados desse nível, eles serão modificados conforme são abertos
};

type EnemyAttibutes = {
  type: "definir-tipos";
  life: number;
  attack: number;
  defense: number;
  speed: number;
  experience: number;
};

type EnemyType = {
  id: number;
  type: "tipos-de-inimigos"; // Com base no tipo, pega os atributos correspondentes
  position: any; // a definir como será o sistema de coordenadas
};

type State = {
  turn: "elements" | "creation" | "actions" | "enemy";
  level: Array<LevelType>; // ver regras dos tiles
  enemies: Array<EnemyType>;
};

type Player = {
  attributes: {
    life: number;
    attack: number;
    defense: number;
    speed: number;
    level: number;
    experience: number;
  };
  elements: Array<ElementType>;
  items: Array<ItemType>;
  position: any; // a definir como será o sistema de coordenadas
};
```

- Criar menu principal para acesso ao jogo

- Criar mecânica de gerenciamento de turnos para definir qual o turno atual e acionar o componente responsável por gerenciar tal turno

- Criar o turno de _elements_ com o sorteio de elementos e mecânica de 3 rerolls, podendo manter quantos elementos quiser entre esses rerolls

- Criar o turno de _creation_ ações onde o player poderá usar os seus elementos para criar os itens necessários.
  -- O player poderá guardar elementos também para poder usar no decorrer de uma jogada para abrir baús ou usar na próxima ação.
  --- Definir um limite de elementos que pode guardar

- Criar o turno de _actions_ onde o usuário poderá usar os seus itens para realizar as suas ações no mapa

-- Sistema de sorteio de tiles.
-- Tipos de tiles:
--- Vazio: apenas movimentação permitida
--- Ninho: Respawn de inimigos (terá ninho level 1 e level 2)
--- Armadinha: Causa 1 de dano ao player
--- Objetivo: concede um totem necessário para abrir o portal do boss
--- Escada: escada que leva o player para o nível 2.

- Criar o turno de _enemy_ onde os inimigos se movem em direção ao player e em seguida dão respawn em pontos vazios.

- Criar tiles de baú/tesouro e suas respectivas ações com os itens pré criados.
  --- Baú: Só pode ser aberto se o player gastar determinados elementos nele.

- Criar sistema de experiência, onde a cada level o player pode escolher 1 atributo para subir 1 ponto.

- Criar sistema de combate com monstros

- Criar encontro com boss final e telas de loading

---

# Ideias jogadas

- Mago que navega pelos tiles usando "dados" que serão elementos que coletará da natureza
- o objetivo é coletar 4 elementos perdidos para ter acesso ao portal que levará até o boss, onde será possível derrotar o boss e fechar o game
- os tiles sempre serão randômicos, garantindo a rejogabilidade

- tipos de itens e seus possíveis elementos: **ideia: a combinação dos elementos que dará os itens a seguir**
  -- BOTA [vento]: Permite se movimentar 1 tile
  -- CURA [luz]: cura 1 ponto de vida
  -- ESPADA [ferro]: 1 dado de ataque em batalha melee
  -- ESCUDO [ferro]: 1 dado de resistência no combate
  -- TELEPORTE [vento + agua]: se teleporta para qualquer tile já aberto anteriormente

- Atributos do player:
  -- PV: Pontos de Vida - 10
  -- ATK: Pontos de Ataque - 2
  -- DEF: Pontos de Defesa - 3
  -- MOV: Pontos de Movimentação - 1

- Atributos do inimigo:
  -- PV: Pontos de Vida - x
  -- ATK: Pontos de Ataque - x
  -- DEF: Pontos de Defesa - x
  -- MOV: Pontos de Movimentação - x
  -- XP: Experiência concedida após derrotar

- Baú de itens:
  -- XXX: Aumenta um ponto de PV
  -- XXX: Aumenta um ponto de ATK
  -- XXX: Aumenta um ponto de DEF
  -- XXX: Aumenta um ponto de MOV
  -- XXX: Cura um ponto de vida
  -- XXX: Concede um dado para ATK
  -- XXX: Concede um dado para DEF

- Serão 2 níveis de tiles, onde o usuário terá que coletar os totens necessário para invocar o portal para acessar o boss
  -- Talvez colocar mais níveis se o jogo ficar muito fácil

---

# Regras

- Um player não pode se movimentar se um inimigo estiver no mesmo tile que ele (será que isso fica chato?)
- - Se ficar chato, talvez seja melhor deixar o player se movimentar, mas precisa de uma mecânica para transformar o inimigo em uma ameaça real. Talvez ele sempre ataque o inimigo ao entrar em contato. Neste caso, limitar o número de inimigos que podem entrar no mesmo tile (ou até mesmo por nível)

- Sistema de combate será sempre a soma dos pontos de ATK do personagem + resultado nos dados - resistência do alvo.

- Sistema de movimentação: sempre fixo (sempre pode andar X tiles)

- Tiles:
  -- O jogo sempre fará o start de X tiles disponíveis, para delimitar a área de jogo
  -- Os tiles serão sempre inicializados como 'hidden'

---

# Ideias avançadas - pós alpha

- Sistema de eventos, onde o player encontra um tile de evento e algo acontece, como por exemplo, respawn um monstro no tile X
- Criar personanges e cada personagem tem suas caracteristicas e uma habilidade especial
- Permitir selecionar o tipo de mapa antes de iniciar partida, assim cada mapa terá seus inimigos próprios e seu cenário
- Permitir salvar/carregar o jogo atual

---

# Existe um mundo onde

- Poderá ser multiplayer
