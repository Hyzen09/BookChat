
# BookChat
An online chatbot that take a pdf(Book) as an input and allows you to ask question about that perticular book 

(not hosted yet)
## API Reference

#### Get Answer 

```http
  POST http://localhost:8000/api/v1/chat
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `question` | `string` | Get a string that Answer's your qusetion.|

#### upload pdf

```http
  POST http://localhost:8000/api/v1/ingest_book
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `pdf File`| `pdf` | upload your prefered book's pdf.|

## Internal API Reference

#### recomended question

```http
  POST http://localhost:8000/api/v1/suggest_question
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Last Answer`| `string` | returns recomended questions.|

