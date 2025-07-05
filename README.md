# News Aggregator Application  

A modern news aggregator that provides personalized, categorized, and multi-sourced news.

## Features  

- Fetches news articles from the following APIs:  
  - *News.org*
  - *The New York Times*
  - *The Guardian*
- Search articles by keywords.  

- Filter articles by categories such as:  
  - Technology  
  - Business  
  - Sports  
  - Entertainment  
  - Science  
- Filter articles based on their source.  

- Users can save their preferences for:  
  - Categories of interest  
  - Preferred news sources  

- Modern, Responsive UI  

- Live URL: https://news-aggregator-react.vercel.app/

---

## Build and Run

### 1. **Development**

Use the following command to build the development image, :

```bash
docker build --target development -t news-aggregator:dev .
```

To run the development server:

```bash
docker run -p 5173:5173 news-aggregator:dev
```

### 2. **Production**

Use the following command to build production image:

```bash
docker build --target production -t news-aggregator:prod .
```

Run the production app with Nginx:

```bash
docker run -p 80:80 news-aggregator:prod
```
---

## Screenshots

![image](https://github.com/user-attachments/assets/c061c3fe-3168-4732-bc71-896219d626a1)


---

![image](https://github.com/user-attachments/assets/570a37dd-95fc-4425-b095-5d0a4ff0b4c1)


---
# react-news-aggregator
