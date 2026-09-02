export const codeExamples = {
  basic: `package main

import (
    "fmt"
    "log"

    "github.com/AbdoAnss/go-fantasy-pl/client"
)

func main() {
    c, err := client.NewClient()
    if err != nil {
        log.Fatal(err)
    }

    teams, err := c.Teams.GetAllTeams()
    if err != nil { log.Fatal(err) }

    players, err := c.Players.GetAllPlayers()
    if err != nil { log.Fatal(err) }

    gw, err := c.Bootstrap.GetCurrentGameWeek()
    if err != nil { log.Fatal(err) }

    fmt.Printf("GW %d — teams: %d, players: %d\\n", gw, len(teams), len(players))
}`,
  async: `package main

import (
    "context"
    "fmt"
    "log"
    "time"

    "github.com/AbdoAnss/go-fantasy-pl/client"
)

func main() {
    c, err := client.NewClient()
    if err != nil { log.Fatal(err) }

    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()

    // Launch all three fetches concurrently
    playersCh  := c.Players.GetAllPlayersAsync(ctx)
    teamsCh    := c.Teams.GetAllTeamsAsync(ctx)
    fixturesCh := c.Fixtures.GetAllFixturesAsync(ctx)

    players  := <-playersCh
    teams    := <-teamsCh
    fixtures := <-fixturesCh

    if players.Err  != nil { log.Fatal(players.Err) }
    if teams.Err    != nil { log.Fatal(teams.Err) }
    if fixtures.Err != nil { log.Fatal(fixtures.Err) }

    fmt.Printf("players: %d, teams: %d, fixtures: %d\\n",
        len(players.Value), len(teams.Value), len(fixtures.Value))
}`,
  batch: `package main

import (
    "context"
    "fmt"
    "log"

    "github.com/AbdoAnss/go-fantasy-pl/client"
)

func main() {
    c, _ := client.NewClient()
    ctx  := context.Background()

    // Fetch histories for multiple players concurrently
    ids := []int{1, 2, 3, 100, 200}
    results, err := c.Players.GetPlayerHistoriesBatch(ctx, ids)
    if err != nil { log.Fatal(err) }

    for id, history := range results {
        fmt.Printf("player %d — %d GW entries\\n", id, len(history))
    }
}`,
}
