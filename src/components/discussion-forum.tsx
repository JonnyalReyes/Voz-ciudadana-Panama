"use client";

import type React from "react";
import { useState, useEffect } from "react";
import type { Session } from "next-auth";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { ThumbsUp, MessageSquare, Flag, Send, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Label } from "./ui/label";


interface Comment {
    id: number;
    comment_text: string;
    created_at: string;
    user_id: number;
    nombre: string;
    apellido: string;
    likes: number;
}

interface DiscussionForumProps {
    problematicaId: number;
    session: Session | null;
}

export default function DiscussionForum({ problematicaId, session }: DiscussionForumProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/problematicas/${problematicaId}/comments`);
      if (response.ok) {
        setComments(await response.json());
      }
    } catch (error) {
      console.error("Error al cargar comentarios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [problematicaId]);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/problematicas/${problematicaId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment_text: newComment }),
      });
      if (!response.ok) throw new Error('No se pudo publicar el comentario.');
      setNewComment("");
      fetchComments(); // Recargar comentarios
    } catch (error) {
      console.error(error);
      alert((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (commentId: number) => {
    if (!session) return alert("Debes iniciar sesión para dar like.");
    try {
      await fetch(`/api/comments/${commentId}/like`, { method: 'POST' });
      fetchComments(); // Recargar para actualizar el conteo de likes
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };
  
  const getInitials = (name: string = "") => name.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <div className="space-y-6">
      {session ? (
        <Card>
          <form onSubmit={handlePostComment}>
            <CardContent className="p-4">
              <Label htmlFor="new-comment" className="font-semibold">Únete a la discusión</Label>
              <Textarea
                id="new-comment"
                placeholder="Escribe tu comentario aquí..."
                className="mt-2 min-h-[100px]"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
            </CardContent>
            <CardContent className="p-4 pt-0 flex justify-end">
              <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
                {isSubmitting ? 'Publicando...' : 'Publicar Comentario'}
              </Button>
            </CardContent>
          </form>
        </Card>
      ) : (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Se requiere inicio de sesión</AlertTitle>
          <AlertDescription>
            Debes <Link href="/registro?tab=iniciar-sesion" className="font-bold underline">iniciar sesión</Link> para poder comentar.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {isLoading ? (
          <p>Cargando comentarios...</p>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-4 sm:p-6 flex gap-4">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarFallback>{getInitials(`${comment.nombre} ${comment.apellido}`)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{comment.nombre} {comment.apellido}</span>
                    <span className="text-sm text-muted-foreground">{new Date(comment.created_at).toLocaleString('es-PA')}</span>
                  </div>
                  <p className="text-foreground/90">{comment.comment_text}</p>
                  <div className="flex items-center gap-4 pt-2">
                    <Button variant="ghost" size="sm" className="gap-1 h-8" onClick={() => handleLike(comment.id)}>
                      <ThumbsUp className="h-4 w-4" />
                      <span>{comment.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1 h-8">
                      <MessageSquare className="h-4 w-4" />
                      <span>Responder</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}