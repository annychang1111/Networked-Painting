# Networked-Painting
A collaborative painting app that allows two people to paint on a same canvas over the network

------------------
CONTROLs :
------------------

Input: Remote IP, Remote port and Local port
ButtonPressed(Connect!): to Connect over the network
MouseDragged: to Draw on the canvas

(KeyPressed)
"r": to Change R value of the brush color(color mode: RGB)
"g": to Change G value of the brush color
"b": to Change B value of the brush color
"e": to Toggle the eraser
"+": to Increase the brush size
"-": to Decrease the brush size
"SPACE": to Clear the canvas


------------------
MSG Sent over OSC :
------------------

/brushWei', strokeWei, '/brushMouseX', mouseX, '/brushMouseY', mouseY, '/brushPmouseX', pmouseX, '/brushPmouseY', pmouseY,'/brushColorRGB', r, g, p
