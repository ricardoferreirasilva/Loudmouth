package server;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpContext;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.xml.internal.ws.policy.privateutil.PolicyUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Handler implements HttpHandler {

    private Server server;

    Handler(Server server) {
        this.server = server;
    }

    @Override
    public void handle(HttpExchange httpExchange) throws IOException {
        String path = httpExchange.getRequestURI().getPath();

        switch (path) {
            case "/login":
                handleLogin(httpExchange);
                break;
            case "/register":
                handleRegister(httpExchange);
                break;
            case "/createChat":
                handleCreateChat(httpExchange);
                break;
            case "/getMyChats":
                handleGetMyChats(httpExchange);
                break;
            case "/getInvites":
                handleGetInvites(httpExchange);
                break;
            case "/invitation":
                handleInvitation(httpExchange);
                break;
            case "/acceptInvite":
                handleAcceptInvite(httpExchange);
                break;
            case "/declineInvite":
                handleDeclineInvite(httpExchange);
                break;
            case "/leaveChat":
                handleLeaveChat(httpExchange);
                break;
            case "/getMessages":
                handleGetMessages(httpExchange);
                break;
            case "/addMessage":
                handleAddMessage(httpExchange);
                break;
            default:
                handleInfo(httpExchange);
                break;
        }
    }

    private void handleLogin(HttpExchange httpExchange) throws IOException {
        String query = getQueryOfPostRequest(httpExchange);
        Map<String,String> params = queryToMap(query);
        String username = params.get("username");
        String password = params.get("password");

        JSONObject obj = new JSONObject();
        if (server.userExist(username, password)) {
            obj.put("success", "Login successfully.");
        }
        else {
            obj.put("error", "Username or password are wrong.");
        }
        String jsonText = jsonToString(obj);

        writeResponse(httpExchange, jsonText);
    }

    private void handleRegister(HttpExchange httpExchange) throws IOException {
        String query = getQueryOfPostRequest(httpExchange);
        Map<String,String> params = queryToMap(query);
        String username = params.get("username");
        String password = params.get("password");

        JSONObject obj = new JSONObject();
        if (server.userExist(username)) {
            obj.put("error", "Username " + username + " already exists.");
        }
        else {
            server.insertUser(username, password);
            obj.put("success", "User registered successfully.");
        }
        String jsonText = jsonToString(obj);
        writeResponse(httpExchange, jsonText);
    }

    private void handleCreateChat(HttpExchange httpExchange) throws IOException {
        String query = getQueryOfPostRequest(httpExchange);
        Map<String,String> params = queryToMap(query);
        String chatName = params.get("chatName");
        String creator = params.get("creator");
        JSONObject obj = new JSONObject();

        if (server.chatExist(chatName)) {
            obj.put("error", "Chat " + chatName + " already exists.");
        }
        else {
            server.insertChat(chatName);
            server.addUserToChat(creator, chatName);
            obj.put("success", "Chat created successfully.");
        }
        String jsonText = jsonToString(obj);
        writeResponse(httpExchange, jsonText);
    }

    private void handleGetMyChats(HttpExchange httpExchange) throws IOException {
        Map<String,String> params = queryToMap(httpExchange.getRequestURI().getQuery());
        String username = params.get("username");
        JSONObject obj = new JSONObject();
        JSONArray array = new JSONArray();
        ArrayList<String> myChats = server.getUserChats(username);

        for (String chat: myChats)
            array.add(chat);
        obj.put("chats", array);
        String jsonText = jsonToString(obj);
        writeResponse(httpExchange, jsonText);
    }

    private void handleGetInvites(HttpExchange httpExchange) throws IOException {
        Map<String,String> params = queryToMap(httpExchange.getRequestURI().getQuery());
        String username = params.get("username");
        JSONObject obj = new JSONObject();
        JSONArray array = new JSONArray();
        ArrayList<String> invitations = server.getUserInvitations(username);

        for (String invitation: invitations)
            array.add(invitation);
        obj.put("invitations", array);
        String jsonText = jsonToString(obj);
        writeResponse(httpExchange, jsonText);
    }

    private void handleInvitation(HttpExchange httpExchange) throws IOException {
        String query = getQueryOfPostRequest(httpExchange);
        Map<String,String> params = queryToMap(query);
        String chatName = params.get("chatName");
        String invitee = params.get("invitee");
        JSONObject obj = new JSONObject();
        ArrayList<String> invitations = server.getUserInvitations(invitee);
        ArrayList<String> chats = server.getUserChats(invitee);

        if (!server.userExist(invitee)) {
            obj.put("error", "The user " + invitee + " does not exist.");
        }
        else if (chats.contains(chatName)) {
            obj.put("error", "The user " + invitee + " already is on chat.");
        }
        else if (!invitations.contains(chatName)) {
            server.insertInvitation(chatName, invitee);
            obj.put("success", "Invitation created successfully.");
        }
        else if (invitations.contains(chatName)) {
            obj.put("error", "The user " + invitee + " already was invited.");
        }

        String jsonText = jsonToString(obj);
        writeResponse(httpExchange, jsonText);
    }

    private void handleAcceptInvite(HttpExchange httpExchange) throws IOException {
        String query = getQueryOfPostRequest(httpExchange);
        Map<String,String> params = queryToMap(query);
        String chatName = params.get("chatName");
        String invitee = params.get("invitee");
        JSONObject obj = new JSONObject();

        server.acceptInvitation(invitee, chatName);
        obj.put("success", "You are in the chat.");

        String jsonText = jsonToString(obj);
        writeResponse(httpExchange, jsonText);
    }

    private void handleDeclineInvite(HttpExchange httpExchange) throws IOException {
        String query = getQueryOfPostRequest(httpExchange);
        Map<String,String> params = queryToMap(query);
        String chatName = params.get("chatName");
        String invitee = params.get("invitee");
        JSONObject obj = new JSONObject();

        server.declineInvitation(invitee, chatName);
        obj.put("success", "You declined the invitation.");

        String jsonText = jsonToString(obj);
        writeResponse(httpExchange, jsonText);
    }

    private void handleLeaveChat(HttpExchange httpExchange) throws IOException {
        String query = getQueryOfPostRequest(httpExchange);
        Map<String,String> params = queryToMap(query);
        String chatName = params.get("chatName");
        String username = params.get("username");
        JSONObject obj = new JSONObject();

        server.leaveChat(username, chatName);
        obj.put("success", "You leave the chat.");

        String jsonText = jsonToString(obj);
        writeResponse(httpExchange, jsonText);
    }

    private void handleGetMessages(HttpExchange httpExchange) throws IOException {
        Map<String,String> params = queryToMap(httpExchange.getRequestURI().getQuery());
        String chatName = params.get("chatName");
        JSONArray jsonArray = new JSONArray();

        ArrayList<ArrayList<String>> messages = server.getChatMessages(chatName);
        for (ArrayList<String> msg: messages) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("author", msg.get(0));
            jsonObject.put("msg", msg.get(1));
            jsonObject.put("date", msg.get(2));
            jsonArray.add(jsonObject);
        }

        String jsonText = jsonToString(jsonArray);
        writeResponse(httpExchange, jsonText);
    }

    private void handleAddMessage(HttpExchange httpExchange) throws IOException {
        String query = getQueryOfPostRequest(httpExchange);
        Map<String,String> params = queryToMap(query);
        String chatName = params.get("chatName");
        String author = params.get("author");
        String msg = params.get("msg");
        System.out.println(author + " : " + msg);
        String date = params.get("date");
        ArrayList<String> message = new ArrayList<>();
        message.add(author);
        message.add(msg);
        message.add(date);
        JSONObject obj = new JSONObject();

        server.addMessageToChat(chatName, message);
        obj.put("success", "You send message successfully.");

        String jsonText = jsonToString(obj);
        writeResponse(httpExchange, jsonText);
    }

    private void handleInfo(HttpExchange httpExchange) throws IOException {
        String response = "Use /get?hello=word&foo=bar to see how to handle url parameters";
        writeResponse(httpExchange, response);
    }

    private String jsonToString(JSONObject jsonObject) throws IOException {
        StringWriter out = new StringWriter();
        jsonObject.writeJSONString(out);
        return out.toString();
    }

    private String jsonToString(JSONArray jsonArray) throws IOException {
        StringWriter out = new StringWriter();
        jsonArray.writeJSONString(out);
        return out.toString();
    }

    private void handleGet(HttpExchange httpExchange) throws IOException {
        StringBuilder response = new StringBuilder();
        Map<String,String> parms = queryToMap(httpExchange.getRequestURI().getQuery());

        JSONObject obj = new JSONObject();
        obj.put("hello", parms.get("hello"));
        obj.put("foo", parms.get("foo"));
        StringWriter out = new StringWriter();
        obj.writeJSONString(out);
        String jsonText = out.toString();

        response.append(jsonText);
        writeResponse(httpExchange, response.toString());
    }

    private void handlePost(HttpExchange httpExchange) throws IOException {
        StringBuilder response = new StringBuilder();

        String qry = getQueryOfPostRequest(httpExchange);
        System.out.println(qry);

        Map <String,String>parms = queryToMap(qry);

        JSONObject obj = new JSONObject();
        obj.put("hello", httpExchange.getPrincipal().getUsername());
        obj.put("foo", parms.get("foo"));
        StringWriter out = new StringWriter();
        obj.writeJSONString(out);
        String jsonText = out.toString();

        response.append(jsonText);
        writeResponse(httpExchange, response.toString());
    }

    private String getQueryOfPostRequest(HttpExchange httpExchange) throws IOException {
        InputStream in = httpExchange.getRequestBody();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        byte buf[] = new byte[4096];

        for (int n = in.read(buf); n > 0; n = in.read(buf))
            out.write(buf, 0, n);
        return new String(out.toByteArray());
    }

    private void writeResponse(HttpExchange httpExchange, String response) throws IOException {
        Headers responseHeaders = httpExchange.getResponseHeaders();
        responseHeaders.set("Content-Type", "application/json");

        httpExchange.sendResponseHeaders(200, response.length());

        OutputStream os = httpExchange.getResponseBody();
        os.write(response.getBytes());
        os.close();

        server.recordsDatabaseToFile();
    }

    /**
     * returns the url parameters in a map
     * @param query
     * @return map
     */
    private static Map<String, String> queryToMap(String query){
        Map<String, String> result = new HashMap<>();
        for (String param : query.split("&")) {
            String pair[] = param.split("=");
            if (pair.length>1) {
                result.put(pair[0], pair[1]);
            }else{
                result.put(pair[0], "");
            }
        }
        return result;
    }
}
