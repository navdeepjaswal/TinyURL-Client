import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

const shortenURL = async (longURL) => {
  const { data } = await axios.post("http://localhost:3000/api/createURL", {
    url: longURL,
  });
  return data;
};

function Form() {
  const [longURL, setLongURL] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  const urlMutate = useMutation({
    mutationFn: shortenURL,
    onSuccess: (data) => {
      console.log(`shortened URL: ` + data.shortURL);
      setShortenedUrl(data.shortURL);
      setLongURL("");
    },
    onError: (error) => {
      console.log(error);
      alert(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(longURL);
    if (longURL.trim()) {
      urlMutate.mutate(longURL);
    }
  };

  return (
    <div className="w-1/2 mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Link className="text-gray-600" size={24} />
          <p className="text-gray-700 font-secondary text-xl font-light">
            {!shortenedUrl ? "Shorten a long URL:" : "Here's your shortened URL:"}
          </p>
        </div>

        <form
          className="flex items-center gap-4 flex-col"
          onSubmit={handleSubmit}
        >
          {!shortenedUrl && (
            <Input
              type="text"
              value={longURL}
              onChange={(e) => setLongURL(e.target.value)}
              placeholder="Enter Long URL"
              className="flex-1 font-secondary focus-visible:ring-0"
            />
          )}

          {shortenedUrl && (
            <p className="text-green-800 font-secondary text-xl font-light">
                <a href={shortenedUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 hover:underline transition-all duration-100"> {shortenedUrl}</a>
            </p>
          )}

          {shortenedUrl ? (
            <Button
              onClick={() => {
                setShortenedUrl('');
                setLongURL('');
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              Shorten Another
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8"
            >
              Submit
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Form;
