import { createServer } from 'miragejs';

export function startMirage() {
  createServer({
    routes() {
      this.namespace = 'api';

      let songs = [
        { id: 1, title: 'Song 1', artist: 'Artist 1', album: 'Album 1', year: 2020, genre: 'Pop', duration: '3:45' },
        { id: 2, title: 'Song 2', artist: 'Artist 2', album: 'Album 2', year: 2021, genre: 'Rock', duration: '4:20' },
      ];

      this.get('/songs', (schema, request) => {
        const page = parseInt(request.queryParams.page) || 1;
        const limit = parseInt(request.queryParams.limit) || 10;
        const start = (page - 1) * limit;
        const end = start + limit;
        return {
          songs: songs.slice(start, end),
          total: songs.length,
          page,
          limit,
        };
      });

      this.get('/songs/:id', (schema, request) => {
        return songs.find(song => song.id === parseInt(request.params.id));
      });

      this.post('/songs', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const newSong = { id: songs.length + 1, ...attrs, genre: attrs.genre || 'Unknown', duration: attrs.duration || '0:00' };
        songs.push(newSong);
        return newSong;
      });

      this.put('/songs/:id', (schema, request) => {
        const id = parseInt(request.params.id);
        const attrs = JSON.parse(request.requestBody);
        songs = songs.map(song => (song.id === id ? { ...song, ...attrs } : song));
        return songs.find(song => song.id === id);
      });

      this.delete('/songs/:id', (schema, request) => {
        const id = parseInt(request.params.id);
        songs = songs.filter(song => song.id !== id);
        return { success: true };
      });
    },
  });
}