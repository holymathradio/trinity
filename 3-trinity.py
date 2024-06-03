import math
#from manim import *
from manimlib import *
import cmath
import inspect

def __init__(self, text, **kwargs):
    super().__init__(**kwargs)
    self.text = text
    self.create_text()

class TexCustom(VGroup):
    def __init__(self, text, **kwargs):
        super().__init__(**kwargs)
        self.text = text
        self.create_text()

    def create_text(self):
        # Use regular expression to find text inside $$
        math_pattern = r"\$\$([^$]+)\$\$"
        matches = re.finditer(math_pattern, self.text)

        # Split the text based on $$ matches
        parts = re.split(math_pattern, self.text)

        current_position = ORIGIN
        for i, part in enumerate(parts):
            if i % 2 == 0:
                # Even indices are outside $$
                text_obj = Text(part)
            else:
                # Odd indices are inside $$
                text_obj = TexText(part)

            text_obj.next_to(current_position, DOWN)
            current_position = text_obj.get_corner(UP + RIGHT)

            self.add(text_obj)
config = {
    "custom_config": {
        "tex": "xelatex -no-pdf"
    }
}

class CustomFunctionGraph(VMobject):
    def __init__(self, function, x_range=[-1, 1], **kwargs):
        super().__init__(**kwargs)
        self.function = function
        x_min, x_max, x_step = x_range
        if x_step > 0:
            x_values = np.arange(x_min, x_max + x_step, x_step)
        else:
            x_values = np.arange(x_max, x_min - x_step, -x_step)[::-1]
        points = [np.array([x, function(x), 0]) for x in x_values]
        self.set_points_smoothly(points)

class Trinity(Scene):
    def construct(self):
        axes = Axes(
            # x-axis ranges from -1 to 10, with a default step size of 1
            x_range=(-10, 10, 5),
            # y-axis ranges from -2 to 2 with a step size of 0.5
            #y_range=(-2, 2, 0.5),
            # The axes will be stretched so as to match the specified
            # height and width
            height=6,
            width=10,
            # Axes is made of two NumberLine mobjects.  You can specify
            # their configuration with axis_config
            axis_config={
                "stroke_color": GREY_A,
                "stroke_width": 2,
                "include_tip": True
            },
            # Alternatively, you can specify configuration for just one
            # of them, like this.
            y_axis_config={
                "include_tip": False,
                "stroke_color": BLACK
            }
        )
        # Keyword arguments of add_coordinate_labels can be used to
        # configure the DecimalNumber mobjects which it creates and
        # adds to the axes
        axes.add_coordinate_labels(
            font_size=20,
            num_decimal_places=0,
        )
        # self.add(axes)
        axes.shift(-axes.get_center())

        # current height of the frame
        #self.camera.reset_pixel_shape(new_width=1300, new_height= 1300)

        # update the height of the frame
        # text = Text("Here is a text", font="Consolas", font_size=90)



        title = Text(
            "The Holy Trinity",
            font="Arial",
            t2f={"font": "Consolas", "words": "Consolas"},
            t2c={"God": YELLOW, "words": GREEN}
        )

        title_father = Text(
            "The Father",
            font="Arial",
            t2f={"font": "Consolas", "words": "Consolas"},
            t2c={"God": YELLOW, "words": GREEN}
        )

        title_son = Text(
            "The Son",
            font="Arial",
            t2f={"font": "Consolas", "words": "Consolas"},
            t2c={"God": YELLOW, "words": GREEN}
        )

        title_holyspirit = Text(
            "The Son",
            font="Arial",
            t2f={"font": "Consolas", "words": "Consolas"},
            t2c={"God": YELLOW, "words": GREEN}
        )



        text_j11 = Text(
            "In the beginning was the word,\nand the Word was with God,\nand the Word was God.",
            font="Arial",
            t2f={"font": "Consolas", "words": "Consolas"},
            t2c={"Word": YELLOW, "word": YELLOW, "God": YELLOW}
        )

        self.wait(3)
        self.play(Write(text_j11,run_time = 8))
        self.wait(5)
        self.play(FadeOut(text_j11))
        self.wait(2)


        circle = Circle(radius=2).set_opacity(0)

        font_size_rotating = 86

        # Create Tex objects for +, -, and .
        plus = Tex("+", font_size=font_size_rotating)
        rel = TexText("""$<$""", font_size=font_size_rotating)#, font_size=font_size_rotating, color=BLUE)
        dot = TexText("""$\\times$""", font_size=font_size_rotating) #Tex(".")

        # Position the Tex objects on the circle

        #times.next_to(circle, RIGHT, buff=0)
        dot.next_to(circle, UP, buff=0)

        # Calculate the other two vertices of the equilateral triangle
        radius = 2
        angle = np.pi / 2  # 60 degrees in radians

        symb_zero = r"$0$"
        symb_inf = r"$\infty$"
        symb_1 = r"$1$"

        symb_plus = r"$+$"
        symb_low = r"$<$"
        symb_time = r"$\times$"

        symb_list = [symb_1, symb_zero, symb_plus, symb_time, symb_low, symb_inf]

        rotating_symbols = [TexText(t, font_size=font_size_rotating) for t in symb_list]
        rotating_symbols_first = [TexText(t, font_size=font_size_rotating) for t in symb_list]

        def update_symb_position(dot, symb, n):
            center = circle.get_center()
            radius = circle.get_width() / 2
            angle = -np.arctan2(dot.get_y() - center[1], dot.get_x() - center[0])

            start_angle = PI / 2 + angle

            # Ensure the angle is between 0 and 2pi
            angle_rad = ( -angle) % (2 * np.pi)

            start_font_size = 86
            new_font_size = np.cos(angle_rad/4) * start_font_size
            symb = TexText(symb.get_tex(), font_size=new_font_size)

            x = center[0] + radius * np.cos(start_angle + n * np.pi / 3)  # np.pi / 3
            y = center[1] + radius * np.sin(start_angle + n * np.pi / 3)  #

            symb.move_to([x, y, 0])

            return symb

        def appearing_circle(dot,circle):
            center = circle.get_center()
            radius = circle.get_width() / 2
            # angle = dot_angel.get_angle()
            angle = -np.arctan2(dot.get_y() - center[1], dot.get_x() - center[0])

            start_angle = PI / 2 + angle

            # Ensure the angle is between 0 and 2pi
            angle_rad = (-angle) % (2 * np.pi)

            new_opacity = 1-np.cos(angle_rad / 4)

            circle = Circle(radius=2, fill_opacity=0, stroke_opacity=new_opacity, stroke_color=WHITE)

            return circle

        travel_circle_dot = Dot([2, 0, 0])
        travel_circle_dot.set_opacity(0)

        initial_symbols = [update_symb_position(travel_circle_dot, rotating_symbols[i], i) for i in range(6)]


        update_symb_position(travel_circle_dot, rotating_symbols[0], 0)

        for i in [1,0,5,2,3,4]:
            self.play(Write(initial_symbols[i], run_time=1))

        self.wait(4)


        for i in range(6):
            self.add(rotating_symbols[i])


        rotating_symbols[0].add_updater(lambda d: d.become(update_symb_position(travel_circle_dot, rotating_symbols[0], 0)))
        rotating_symbols[5].add_updater(lambda d: d.become(update_symb_position(travel_circle_dot, rotating_symbols[5], 5)))
        rotating_symbols[1].add_updater(lambda d: d.become(update_symb_position(travel_circle_dot, rotating_symbols[1], 1)))
        rotating_symbols[2].add_updater(lambda d: d.become(update_symb_position(travel_circle_dot, rotating_symbols[2], 2)))
        rotating_symbols[3].add_updater(lambda d: d.become(update_symb_position(travel_circle_dot, rotating_symbols[3], 3)))
        rotating_symbols[4].add_updater(lambda d: d.become(update_symb_position(travel_circle_dot, rotating_symbols[4], 4)))

        self.remove(*initial_symbols)

        circle = Circle(radius=2,fill_opacity = 0, stroke_opacity = 0)
        self.add(circle)

        circle.add_updater(lambda d: d.become(appearing_circle(travel_circle_dot,circle)))
        #self.play(Write(rotating_symbols[0]))

        self.wait(5)
        self.play(
            MoveAlongPath(travel_circle_dot, circle, rate_func=linear),

            run_time=6
        )

        font_size_series = 64

        # Create a text object with initial digits
        digits = Tex("1", color=WHITE)
        digits.move_to(ORIGIN)
        self.play(Write(digits))


        t = 0.08
        f = 1.1
        # Perform 10 replacements

        # Transition from the old digits to the new digits
        #self.play(Transform(digits, new_digits, run_time=0.4, rate_func=linear))
        latex_math_symbols = [
            r"$0$",
            r"$1$",
            r"$2$",
            r"$3$",
            r"$4$",
            r"$5$",
            r"$6$",
            r"$7$",
            r"$8$",
            r"$9$",
            r"$\pi$",  # Pi
            r"$e$",  # Euler's number
            r"$\phi$",  # Golden ratio
            r"$\sqrt{2}$",  # Square root of 2
            #r"$\sqrt{3}$",  # Square root of 3
            r"$\shortmid$",
            r"$\shortmid \shortmid$",
            r"$\shortmid \shortmid \shortmid$"
            ]

        for s in latex_math_symbols:
            t=f*t
            if s== r"$\sqrt{2}$":
                new_digits = TexText(s, font_size = font_size_series*0.8, color=WHITE)
            else:
                new_digits = TexText(s, font_size=font_size_series, color=WHITE)

            digits.become(new_digits)
            self.wait(t)


        digits.become(TexText("$x$", font_size =font_size_series, color=GREY))


        circle.clear_updaters()

        # Group the circle, line, and Axes objects together
        group = Group(circle, digits)

        # Scale the group
        self.play(
            group.animate.shift(np.array([0, 0, 0])).scale(1.5),
            run_time=3
        )

        #digits.shift(UP)
        self.play(digits.animate.shift(UP*1.5))

        self.wait(3)

        #Display additions

        # Create two small circles
        small_circle_1 = Circle(radius=0.3*1.5, color=WHITE, fill_opacity=0, stroke_width=3,stroke_color=WHITE)
        small_circle_2 = Circle(radius=0.3*1.5, color=WHITE, fill_opacity=0, stroke_width=3,stroke_color=WHITE)

        # Position the circles
        small_circle_1.next_to(ORIGIN, LEFT*2)
        small_circle_2.next_to(ORIGIN, RIGHT*2)

        # Create the "+" sign
        plus_sign = TexText("$+$",  font_size=40*1.5) #0,color=WHITE

        # Position the "+" sign between the circles
        plus_sign.move_to(ORIGIN)

        # Group the elements
        circles_group = VGroup(small_circle_1, small_circle_2)

        #self.add(plus_sign)


        # Display the elements
        self.play(AnimationGroup(Write(small_circle_1),Write(small_circle_2),lag_ratio=0.3,run_time=3))
        #self.play
        self.play(Write(plus_sign))
        self.wait()

        multiply_sign = TexText("$\\times$",font_size=40*1.5)

        self.play(ReplacementTransform(plus_sign, multiply_sign))
        #self.play(Write(plus_sign, run_time=1))

        # Create a less than sign
        less_than_sign = TexText("$<$",font_size=40*1.5)
        self.wait()

        # Replace multiplication sign with less than sign

        self.play(AnimationGroup(FadeOut(small_circle_2), ReplacementTransform(multiply_sign, less_than_sign), run_time=1)) #lag_ratio=0.5,

        self.wait(8)
        self.remove(small_circle_1)
        self.remove(small_circle_2)  # l_left
        self.remove(less_than_sign)
        self.remove(digits)

        self.play(circle.animate.scale(5), run_time=8)

        circle.scale(10)



        ### THE FATHER ####

        title_father = Text(
            "The Father",
            font="Arial",
            t2f={"font": "Consolas", "words": "Consolas"},
            t2c={"God": YELLOW, "words": GREEN}
        )


        self.play(Write(title_father, run_time=0.1))
        self.wait(5)
        self.play(FadeOut(title_father, run_time=0.1))

        father_dot = Dot(color='#808080',radius=0.12)
        father_dot.move_to(axes.c2p(-9, 0))
        self.play(FadeIn(father_dot, scale=1))

        sign_plus_minus = Text("+-", color=WHITE, font_size=68).set_color_by_text("+", YELLOW)

        sign_plus = Text("+",color=YELLOW,font_size=68 )
        sign_minus = Text("-", color=WHITE, font_size=68)

        self.play(father_dot.animate.move_to(axes.c2p(0, 0)), run_time=4)


        # Set the position of the text to be centered at the point
        sign_plus_minus.move_to(axes.c2p(0, 0)).shift(UP)
        sign_plus.move_to(axes.c2p(0, 0)).shift(UP).shift(3*RIGHT)
        sign_minus.move_to(axes.c2p(0, 0)).shift(UP).shift(3 * LEFT)

        self.play(Write(sign_plus_minus))

        self.wait(5)

        self.play(AnimationGroup(Write(sign_minus),Write(sign_plus)))

        sign_group = Group(sign_plus_minus,sign_plus,sign_minus)

        self.wait(4)

        self.play(sign_group.animate.shift(1.5*UP), run_time=1)

        # create a horizontal line
        linej = Line(start=[0, 0, 0], end=[4, 0, 0], color=YELLOW)

        vertical_segment = Line(linej.get_end() - 0.1 * UP, linej.get_end() + 0.1 * UP)
        self.add(father_dot)  ## bring to front

        self.play(AnimationGroup(FadeIn(linej),FadeIn(vertical_segment)),run_time=2)

        self.add(father_dot)  ## bring to front

        brace = always_redraw(Brace, linej, DOWN, color=GREY)

        text = label = VGroup(
            TexText("$e_{x}$", color=GREY),
        )
        label.arrange(RIGHT)

        # This ensures that the method deicmal.next_to(square)
        # is called on every frame
        always(label.next_to, brace, DOWN)
        # You could also write the following equivalent line
        # label.add_updater(lambda m: m.next_to(brace, UP))

        # If the argument itself might change, you can use f_always,
        # for which the arguments following the initial Mobject method
        # should be functions returning arguments to that method.
        # The following line ensures that decimal.set_value(square.get_y())
        # is called every frame number.set_value,
        f_always( linej.get_width)
        # You could also write the following equivalent line
        # number.add_updater(lambda m: m.set_value(square.get_width()))
        self.wait(4)
        self.add( brace, label)


        self.play(FadeIn(brace), FadeIn(label), run_time=1)

        self.wait(2)

        default_wait_per_paragraph = 8

        frame = Rectangle(width=FRAME_WIDTH*1.2 / 3, height=FRAME_HEIGHT*0.85, color=WHITE, fill_opacity=1, stroke_width=2)

        font_eq = 24
        font_title = 20

        self.play(Write(frame.to_edge(LEFT)), run_time=3)


        margin_left = 0.3*RIGHT
        margin_up = 0.3 * DOWN
        margin_up_s = 0.15 * DOWN


        intro_title = TexText("""$ \\textbf{Number as Space-Time and Teleology:}$ """, font_size=font_title)
        intro_title.set_color(BLACK)

        intro_title.align_to(frame, LEFT).shift(margin_left)
        intro_title.align_to(frame, UP).shift(margin_up)
        self.add(intro_title)

        next = intro_title

        # Create a math equation using TexText
        father_1 = TexText(r"$x = (e_{x},\theta_{L_{o}},\sigma_{x}) \in \mathbb{R}$", font_size = font_eq, color=BLACK)
        father_1.set_color(BLACK)


        # Position the equation within the frame
        #father_1.move_to(frame.get_corner(UL) + 0.2 * DOWN + 0.2 * RIGHT)
        father_1.align_to(frame, LEFT).shift(margin_left)
        father_1.align_to(next, UP).shift(margin_up)
        self.add(father_1)
        self.wait(default_wait_per_paragraph)
        father_2 = TexText("""
                $\\textnormal{where } e_{x} \in (\mathbb{E},+_{\mathbb{E}},\\times_{\mathbb{E}})  \\newline \\textnormal{      } \sigma_{x} \in (\mathbb{S}=\{+_{\mathbb{S}},-_{\mathbb{S}},+-_{\mathbb{S}}\},\\times_{\mathbb{S}})$"""
                           , font_size = font_eq, color=BLACK)

        self.wait(default_wait_per_paragraph)

        #TexText("""
        #    Or thinking of the plane as $\\mathds{C}$,\\\\
        #    this is the map $z \\rightarrow z^2$
        #""")


        father_2.set_color(BLACK)
        #father_2.set_fill(BLACK)


        father_2.align_to(father_1, LEFT)
        father_2.align_to(father_1.get_bottom(), UP).shift(margin_up_s)
        self.add(father_2)


        next = father_2

        self.wait(2*default_wait_per_paragraph)

        quantifiers_mult_math = TexText("""
                             $ \\forall x \\in \\mathbb{R} \quad \\forall e, e',e'' \\in \\mathbb{E}^{3}  $
                         """,font_size = font_eq, alignment = '\\flushleft')
        quantifiers_mult_math.set_color(BLACK)
        quantifiers_mult_math.align_to(next, LEFT)
        quantifiers_mult_math.align_to(next.get_bottom(), UP).shift(margin_up)
        self.add(quantifiers_mult_math)
        next = quantifiers_mult_math

        commutativity_title = TexText("""$ \\textbf{Commutativity ("symetric quantization"):}$ """, font_size = font_title)
        commutativity_title.set_color(BLACK)
        commutativity_math = TexText("""
                             $(e_{x} = e + e') \Rightarrow (e_{x} = e' + e) $
                         """,font_size = font_eq, alignment = '\\flushleft')
        commutativity_math.set_color(BLACK) #\\forall e, e' \\in \\mathbb{E}^{2},\\newline

        commutativity_title.align_to(next, LEFT)
        commutativity_title.align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(commutativity_title)
        next = commutativity_title

        commutativity_math.align_to(next, LEFT)
        commutativity_math.align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(commutativity_math)
        next = commutativity_math


        ## ADD 2 BRACES, 2/5 of the way,and switch them #

        line_commu_left = Line(start=ORIGIN, end=RIGHT*8/5, color=YELLOW).set_opacity(0)
        brace_commu_left = Brace(line_commu_left, UP, color=GREY)
        label_commu_left = TexText("$e$", color=GREY).move_to(line_commu_left.get_center()).shift(0.8*UP)
        brace_labeled_commu_left = Group(brace_commu_left,label_commu_left)

        line_commu_right = Line(start=RIGHT * 8 / 5, end=4*RIGHT, color=YELLOW).set_opacity(0)
        brace_commu_right = Brace(line_commu_right, UP, color=GREY)
        label_commu_right = TexText("$e'$", color=GREY).move_to(line_commu_right.get_center()).shift(0.8*UP)
        brace_labeled_right = Group(brace_commu_right, label_commu_right)





        self.play(AnimationGroup(FadeIn(brace_commu_left ), FadeIn(label_commu_left),FadeIn(brace_commu_right), FadeIn(label_commu_right)),run_time=1)

        self.wait(4)
        self.play(AnimationGroup(brace_labeled_commu_left.animate.shift(4*RIGHT-RIGHT * 8 / 5),brace_labeled_right.animate.shift(LEFT * 8 / 5) ),run_time=2)

        self.wait(2)
        self.play(AnimationGroup(brace_labeled_commu_left.animate.shift(-(4*RIGHT-RIGHT * 8 / 5)),brace_labeled_right.animate.shift(-LEFT * 8 / 5) ),run_time=2)
        self.wait(2)
        self.play(AnimationGroup(brace_labeled_commu_left.animate.shift((4*RIGHT-RIGHT * 8 / 5)),brace_labeled_right.animate.shift(LEFT * 8 / 5) ),run_time=2)
        self.wait(2)
        self.play(AnimationGroup(brace_labeled_commu_left.animate.shift(-(4 * RIGHT - RIGHT * 8 / 5)),brace_labeled_right.animate.shift(-LEFT * 8 / 5)), run_time=2)

        self.wait(default_wait_per_paragraph)


        self.wait(4)

        associativity_title = TexText("""$ \\textbf{Associativity ("simultaneous quantization"):}$ """, font_size = font_title)
        associativity_title.set_color(BLACK)
        associativity_math = TexText("""$(e_{x} = e + ( e' + e'' )) \Rightarrow (e_{x} = (e + e') + e'') $
                         """,font_size = font_eq, alignment = '\\flushleft')
        associativity_math.set_color(BLACK) #\\forall e, e',e'' \\in \\mathbb{E}^{3},\\newline

        associativity_title.align_to(frame, LEFT).shift(margin_left)
        associativity_title.align_to(next.get_bottom(), UP).shift(margin_up)
        self.add(associativity_title)
        next = associativity_title


        associativity_math.align_to(frame, LEFT).shift(margin_left)
        associativity_math.align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(associativity_math)
        next = associativity_math


        self.wait(12)
        label_commu_right.become(TexText("$e'+e''$", color=GREY).move_to(line_commu_right.get_center()).shift(0.8*UP))
        brace_labeled_right = Group(brace_commu_right, label_commu_right)

        line_asso_right_first = Line(start=RIGHT*8/5, end=2*RIGHT*8/5, color=YELLOW).set_opacity(0)
        brace_asso_right_first = Brace(line_asso_right_first, UP, color=GREY)
        label_asso_right_first = TexText("$e'$", color=GREY).move_to(line_asso_right_first.get_center()).shift(0.8*UP)
        brace_asso_right_first = Group(brace_asso_right_first,label_asso_right_first)

        line_asso_right_second = Line(start=2*RIGHT*8/5, end=4*RIGHT, color=YELLOW).set_opacity(0)
        brace_asso_right_second = Brace(line_asso_right_second, UP, color=GREY)
        label_asso_right_second = TexText("$e''$", color=GREY).move_to(line_asso_right_second.get_center()).shift(0.8*UP)
        brace_asso_right_second = Group(brace_asso_right_second,label_asso_right_second)

        line_asso_left_total = Line(start=ORIGIN, end=2*RIGHT*8/5, color=YELLOW).set_opacity(0)
        brace_asso_left_total = Brace(line_asso_left_total, UP, color=GREY)
        label_asso_left_total = TexText("$e+e'$", color=GREY).move_to(line_asso_left_total.get_center()).shift(0.8*UP)
        brace_asso_left_total = Group(brace_asso_left_total,label_asso_left_total)

        self.wait(8)
        self.play(FadeTransform(brace_labeled_right,Group(brace_asso_right_first,brace_asso_right_second)),run_time=4)
        self.wait(4)
        self.play(FadeTransform(Group(brace_labeled_commu_left,brace_asso_right_first), brace_asso_left_total),run_time=4)
        self.wait(8)
        self.play(FadeTransform(brace_asso_left_total,Group(brace_labeled_commu_left,brace_asso_right_first)),run_time=4)
        self.wait(4)
        self.play(FadeTransform(Group(brace_asso_right_first,brace_asso_right_second), brace_labeled_right),run_time=4)



        self.wait(6)
        self.play(FadeOut(label_commu_left),FadeOut(label_commu_right), run_time=2)

        dot_left_travel = Dot(point=[0, 0, 0], color=WHITE).set_opacity(0)
        dot_right = Dot(point=RIGHT * 8 / 5, color=WHITE).set_opacity(0)
        dot_right_travel = Dot(point=RIGHT * 8 / 5, color=WHITE).set_opacity(0)
        print(brace_commu_left.get_right())
        print(line_commu_left.get_end())

        brace_commu_left.add_updater(lambda l: l.become(Brace(Line(start=dot_left_travel.get_center(), end=dot_right.get_center()).set_opacity(0),UP, color=GREY)))

        brace_commu_right.add_updater(lambda l: l.become(Brace(Line(start=dot_right_travel.get_center(), end=4*RIGHT).set_opacity(0),UP, color=GREY)))


        alpha_split = 3/5
        line_asso_series_left_1 = Line(start=ORIGIN, end=dot_left_travel.get_center(), color=YELLOW).set_opacity(0)
        brace_asso_series_left_1 = Brace(line_asso_series_left_1, UP, color=GREY)
        brace_asso_series_left_1.add_updater(lambda l: l.become(Brace(Line(start=ORIGIN, end=dot_left_travel.get_center()).set_opacity(0),UP, color=GREY)))


        line_asso_series_right_1 = Line(start=dot_right.get_center(), end=dot_right_travel.get_center()*alpha_split+dot_right.get_center()*(1-alpha_split), color=YELLOW).set_opacity(0)
        brace_asso_series_right_1 = Brace(line_asso_series_right_1, UP, color=GREY)
        brace_asso_series_right_1.add_updater(lambda l: l.become(Brace(Line(start=dot_right.get_center(), end=dot_right_travel.get_center()*alpha_split+dot_right.get_center()*(1-alpha_split), color=YELLOW).set_opacity(0),UP, color=GREY)))

        line_asso_series_right_2 = Line(start=dot_right_travel.get_center()*alpha_split+dot_right.get_center()*(1-alpha_split), end=dot_right_travel.get_center()).set_opacity(0)
        brace_asso_series_right_2 = Brace(line_asso_series_right_2, UP, color=GREY)
        brace_asso_series_right_2.add_updater(lambda l: l.become(Brace(Line(start=dot_right_travel.get_center()*alpha_split+dot_right.get_center()*(1-alpha_split), end=dot_right_travel.get_center()).set_opacity(0), UP, color=GREY)))

        self.add(brace_asso_series_left_1)
        self.add(brace_asso_series_right_1)
        self.add(brace_asso_series_right_2)

        self.play(AnimationGroup(dot_left_travel.animate.shift(4/5*RIGHT),dot_right_travel.animate.shift(2*RIGHT) ) , run_time=4)

        list_shift_left_to_right = [4*RIGHT-dot_right_travel.get_center()
                                    , dot_right_travel.get_center() - (dot_right_travel.get_center()*alpha_split+dot_right.get_center()*(1-alpha_split))
                                    ,dot_right_travel.get_center()*alpha_split+dot_right.get_center()*(1-alpha_split) -  dot_right.get_center()
                                    ,dot_right.get_center() - dot_left_travel.get_center()
                                    , dot_left_travel.get_center() - ORIGIN
        ]

        print((list_shift_left_to_right[1]+list_shift_left_to_right[2]+list_shift_left_to_right[3]+list_shift_left_to_right[4]))
        brace_commu_right.clear_updaters()
        brace_asso_series_right_2.clear_updaters()
        brace_asso_series_right_1.clear_updaters()
        brace_commu_left.clear_updaters()
        brace_asso_series_left_1.clear_updaters()





        self.wait(2)
        self.play(AnimationGroup(brace_commu_right.animate.shift(-(list_shift_left_to_right[1]+list_shift_left_to_right[2]+list_shift_left_to_right[3]+list_shift_left_to_right[4])),
                                 brace_asso_series_right_2.animate.shift(list_shift_left_to_right[0]-(list_shift_left_to_right[2]+list_shift_left_to_right[3]+list_shift_left_to_right[4])),
                                 brace_asso_series_right_1.animate.shift(list_shift_left_to_right[0] + list_shift_left_to_right[1]-(list_shift_left_to_right[3]+list_shift_left_to_right[4])),
                                 brace_commu_left.animate.shift(list_shift_left_to_right[0] + list_shift_left_to_right[1]+ list_shift_left_to_right[2]-(list_shift_left_to_right[4])),
                                 brace_asso_series_left_1.animate.shift(list_shift_left_to_right[1]+list_shift_left_to_right[2]+list_shift_left_to_right[3]+list_shift_left_to_right[0])),run_time=4)
        self.wait(2)
        self.play(AnimationGroup(brace_commu_right.animate.shift((list_shift_left_to_right[1]+list_shift_left_to_right[2]+list_shift_left_to_right[3]+list_shift_left_to_right[4])),
                                 brace_asso_series_right_2.animate.shift(-(list_shift_left_to_right[0]-(list_shift_left_to_right[2]+list_shift_left_to_right[3]+list_shift_left_to_right[4]))),
                                 brace_asso_series_right_1.animate.shift(-(list_shift_left_to_right[0] + list_shift_left_to_right[1]-(list_shift_left_to_right[3]+list_shift_left_to_right[4]))),
                                 brace_commu_left.animate.shift(-(list_shift_left_to_right[0] + list_shift_left_to_right[1]+ list_shift_left_to_right[2]-(list_shift_left_to_right[4]))),
                                 brace_asso_series_left_1.animate.shift(-(list_shift_left_to_right[1]+list_shift_left_to_right[2]+list_shift_left_to_right[3]+list_shift_left_to_right[0]))

                                 ),run_time=4)

        asso_braces_to_fade_out = [
            brace_commu_right,
            brace_asso_series_right_2,
            brace_asso_series_right_1,
            brace_commu_left,
            brace_asso_series_left_1
            ]

        self.play(*[FadeOut(obj) for obj in asso_braces_to_fade_out],run_time=2)

        self.remove(dot_left_travel)
        self.remove(dot_right)
        self.remove(dot_right_travel)

        self.wait(2)

        ordering_title = TexText("""$ \\textbf{Total Order ("existence of a unique complement"):}$ """, font_size = font_title)
        ordering_title.set_color(BLACK)
        ordering_math = TexText("""    $\\forall y \in \mathbb{R},\\newline \exists ! r \in \mathbb{E}, (e_{x} = e_{y} + r ) \\bigoplus (e_{y} = e_{x} + r )  \quad       $  """,font_size = font_eq, alignment = '\\flushleft')
        ordering_math.set_color(BLACK)

        ordering_title.align_to(frame, LEFT).shift(margin_left)
        ordering_title.align_to(next.get_bottom(), UP).shift(margin_up)
        self.add(ordering_title)
        next = ordering_title

        ordering_math.align_to(frame, LEFT).shift(margin_left)
        ordering_math.align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(ordering_math)
        next = ordering_math

        ## DISPLAY a brace , move it

        x_ey_start = 1.5
        x_ex_end = 4
        x_ey_end = 6.5

        dot_order_y_travel = Dot(point=[x_ey_start, 0, 0], color=WHITE).set_opacity(0)

        line_order_y_travel = Line(start=ORIGIN, end=dot_order_y_travel.get_center()).set_opacity(0)
        brace_order_y_travel = Brace(line_order_y_travel, UP, color=GREY)
        brace_order_y_travel.add_updater(lambda l: l.become(Brace(Line(start=ORIGIN, end=dot_order_y_travel.get_center()).set_opacity(0), UP, color=GREY)))
        # add label

        label_order_y_travel = TexText("$e_{y}$", color=GREY).move_to(dot_order_y_travel.get_center()/2).shift(0.8*UP)
        label_order_y_travel.add_updater(lambda l: l.move_to(dot_order_y_travel.get_center()/2).shift(0.8*UP))
        #brace_labeled_commu_left = Group(brace_commu_left,label_commu_left)
        brace_labeled_order_ey = Group(brace_order_y_travel,label_order_y_travel)

        self.wait(8)

        self.play(FadeIn(brace_labeled_order_ey), run_time = 4)

        self.play(dot_order_y_travel.animate.move_to([x_ey_end,0,0]), run_time=4)
        self.play(dot_order_y_travel.animate.move_to([x_ey_start,0,0]), run_time=4)



        def get_up_opacity(dot):
            r = 1
            if dot.get_center()[0] > x_ex_end :
                r=0
            else:
                r=1
            return r


        ## Add the rest 
        line_order_rest_up = Line(start=[min(dot_order_y_travel.get_center()[0],x_ex_end),0,0], end=[x_ex_end,0,0]).set_opacity(0)
        brace_order_rest_up = Brace(line_order_rest_up, UP, color=GREY)
        brace_order_rest_up.add_updater(lambda l: l.become(Brace(Line(start=[min(dot_order_y_travel.get_center()[0],x_ex_end),0,0], end=[x_ex_end,0,0]).set_opacity(0), UP, color=GREY).set_opacity(get_up_opacity(dot_order_y_travel)) ))
        # add label

        label_order_rest_up = TexText("$r$", color=GREY).move_to((4*RIGHT + dot_order_y_travel.get_center())/2).shift(0.8*UP)
        label_order_rest_up.add_updater(lambda l: l.move_to((4*RIGHT + dot_order_y_travel.get_center())/2).shift(0.8*UP).set_opacity(get_up_opacity(dot_order_y_travel))) #become( TexText(get_up_label(), color=GREY)
        #brace_labeled_commu_left = Group(brace_commu_left,label_commu_left)
        brace_order_rest_up = Group(brace_order_rest_up,label_order_rest_up)

        self.add(brace_order_rest_up)
        
        line_order_rest_down = Line(start=[max(dot_order_y_travel.get_center()[0],x_ex_end),0,0], end=[x_ex_end,0,0]).set_opacity(0)
        brace_order_rest_down = Brace(line_order_rest_down, DOWN, color=GREY)
        brace_order_rest_down.add_updater(lambda l: l.become(Brace(Line(start=[max(dot_order_y_travel.get_center()[0],x_ex_end),0,0], end=[x_ex_end,0,0]).set_opacity(0), DOWN, color=GREY).set_opacity(1-get_up_opacity(dot_order_y_travel)) ))
        # add label

        label_order_rest_down = TexText("$r$", color=GREY).move_to((4*RIGHT + dot_order_y_travel.get_center())/2).shift(0.8*DOWN)
        label_order_rest_down.add_updater(lambda l: l.move_to((4*RIGHT + dot_order_y_travel.get_center())/2).shift(0.8*DOWN).set_opacity(1-get_up_opacity(dot_order_y_travel))) #become( TexText(get_down_label(), color=GREY)
        #brace_labeled_commu_left = Grodown(brace_commu_left,label_commu_left)
        brace_order_rest_down = Group(brace_order_rest_down,label_order_rest_down)

        self.add(brace_order_rest_down)
        
        
        self.play(dot_order_y_travel.animate.move_to([x_ey_end,0,0]), run_time=4)
        self.play(dot_order_y_travel.animate.move_to([x_ey_start,0,0]), run_time=4)

        # Split the braces progressively generating 1 more and then split all of them ##

        self.wait(default_wait_per_paragraph)

        father_eq_title = TexText("""$ \\textbf{The Father ("existence of the origin "):}$ """, font_size = font_title)
        father_eq_title.set_color(BLACK)
        father_eq_math = TexText("""    $\\exists 0 \in \mathbb{E}, \\newline \\forall e,e' \in \mathbb{E}^{2}, (0 = e + e') \Rightarrow (e = e' = 0)    $  """,font_size = font_eq, alignment = '\\flushleft')
        father_eq_math.set_color(BLACK)

        father_eq_title.align_to(frame, LEFT).shift(margin_left)
        father_eq_title.align_to(next.get_bottom(), UP).shift(margin_up)
        self.add(father_eq_title)
        next = father_eq_title

        father_eq_math.align_to(frame, LEFT).shift(margin_left)
        father_eq_math.align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(father_eq_math)
        next = father_eq_math

        self.wait(2*default_wait_per_paragraph)

        # List of objects to fade out
        objects_to_fade_out = [
            intro_title,father_1, father_2,quantifiers_mult_math,
            commutativity_title, commutativity_math,
            associativity_title, associativity_math,
            ordering_title, ordering_math,
            father_eq_title, father_eq_math
        ]

        # Fade out the objects
        self.play(*[FadeOut(obj) for obj in objects_to_fade_out],run_time=2)

 
        order_and_substract_title = TexText("""$ \\textbf{Ordering and substraction (of extensions):}$ """, font_size = font_title)
        order_and_substract_title.set_color(BLACK)
        order_and_substract_math = TexText(""" $\\forall e,e', \in \mathbb{E}^{2},\\newline e \leq_{\mathbb{E}} e' \Leftrightarrow \exists r \in \mathbb{E}, e +  r = e'.$ """,font_size = font_eq, alignment = '\\flushleft')
        order_and_substract_math.set_color(BLACK)

        order_and_substract_title.align_to(frame, LEFT).shift(margin_left)
        order_and_substract_title.align_to(frame, UP).shift(margin_up)
        self.add(order_and_substract_title)
        next = order_and_substract_title

        order_and_substract_math.align_to(frame, LEFT).shift(margin_left)
        order_and_substract_math.align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(order_and_substract_math)
        next = order_and_substract_math


        self.wait(default_wait_per_paragraph)


        substraction_math = TexText(""" $[\exists r \in \mathbb{E}, (e +  r = e')] \Rightarrow  e' -_{\mathbb{E}} e$ = r """,font_size = font_eq, alignment = '\\flushleft')
        substraction_math.set_color(BLACK)

        substraction_math.align_to(frame, LEFT).shift(margin_left)
        substraction_math.align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(substraction_math)
        next = substraction_math

        self.wait(default_wait_per_paragraph)
        order_braces_to_fade_out = [ brace_order_rest_up, brace_order_rest_down, brace_labeled_order_ey ]

        self.play(*[FadeOut(obj) for obj in order_braces_to_fade_out], run_time=2)

        addition_title = TexText("""$ \\textbf{Addition :}$ """, font_size = font_title)
        addition_title.set_color(BLACK)
        addition_math = TexText(
            """ $\\forall x,y, \in \mathbb{R}^{2}, x + y =
            \\newline (e_{x} +_{\mathbb{E}} e_{y},\\theta_{L_{o}},\sigma_{x}) \\textnormal{ if } \sigma_{x} =_{\mathbb{S}} \sigma_{y}, \sigma_{x} \\neq +-
            \\newline (e_{x} -_{\mathbb{E}} e_{y},\\theta_{L_{o}},\sigma_{x}) \\textnormal{ if } \sigma_{x} \\neq_{\mathbb{S}} \sigma_{y}, e_{y} \leq e_{x}, e_{x} \\nleq e_{y}
            \\newline (e_{y} -_{\mathbb{E}} e_{x},\\theta_{L_{o}},\sigma_{y}) \\textnormal{ if } \sigma_{x} \\neq_{\mathbb{S}} \sigma_{y}, e_{x} \leq e_{y}, e_{y} \\nleq e_{x}
            \\newline (e_{y} +_{\mathbb{E}} e_{x},\\theta_{L_{o}},\sigma_{y}) \\textnormal{ if } \sigma_{x} =_{\mathbb{S}} \sigma_{y}, \sigma_{x} = +-
            \\newline (e_{y} -_{\mathbb{E}} e_{x},\\theta_{L_{o}},+-) \\textnormal{ if } \sigma_{x} \\neq_{\mathbb{S}} \sigma_{y}, e_{x} \leq e_{y}, e_{y} \leq e_{x}
           $
             """,
            font_size=font_eq, alignment='\\flushleft')
        addition_math.set_color(BLACK)


        addition_title.align_to(frame, LEFT).shift(margin_left)
        addition_title.align_to(next.get_bottom(), UP).shift(margin_up)
        self.add(addition_title)
        next = addition_title

        addition_math.align_to(frame, LEFT).shift(margin_left)
        addition_math.align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(addition_math)
        next = addition_math

        self.wait(4*default_wait_per_paragraph)

        real_ordering_title = TexText("""$ \\textbf{Ordering :}$ """, font_size = font_title)
        real_ordering_title.set_color(BLACK)
        real_ordering_math = TexText(
            """ $\\forall x,y, \in \mathbb{R}^{2}, x \leq y \Leftrightarrow
            \\newline (\sigma_{x} = - \wedge \sigma_{y} = +)  
            \\newline  \\bigoplus (e_{x} \leq e_{y}  \wedge \sigma_{x} =_{\mathbb{S}} \sigma_{y} =_{\mathbb{S}} + )
            \\newline \\bigoplus (e_{y} \leq e_{x}  \wedge  \sigma_{x} =_{\mathbb{S}} \sigma_{y} =_{\mathbb{S}} -)
         $
             """,
            font_size=font_eq, alignment='\\flushleft')
        real_ordering_math.set_color(BLACK)

        real_ordering_title.align_to(frame, LEFT).shift(margin_left)
        real_ordering_title.align_to(next.get_bottom(), UP).shift(margin_up)
        self.add(real_ordering_title)
        next = real_ordering_title

        real_ordering_math.align_to(frame, LEFT).shift(margin_left)
        real_ordering_math.align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(real_ordering_math)
        next = real_ordering_math

        self.wait(2*default_wait_per_paragraph)

        binding_sign_title = TexText("""$ \\textbf{Binding of +- :}$ """, font_size = font_title)
        binding_sign_title.set_color(BLACK)
        binding_sign_math = TexText(
            """ $\\forall x \in \mathbb{R}, e_{x}= 0 \Leftrightarrow \sigma_{x}=  +-
         $
             """,
            font_size=font_eq, alignment='\\flushleft')
        binding_sign_math.set_color(BLACK)

        binding_sign_title.align_to(frame, LEFT).shift(margin_left)
        binding_sign_title.align_to(next.get_bottom(), UP).shift(margin_up)
        self.add(binding_sign_title)
        next = binding_sign_title

        binding_sign_math.align_to(frame, LEFT).shift(margin_left)
        binding_sign_math.align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(binding_sign_math)
        next = binding_sign_math

        self.wait(default_wait_per_paragraph)

        equation_to_fade_out2 = [
            order_and_substract_title,order_and_substract_math,substraction_math,addition_title,
            addition_math,real_ordering_title,real_ordering_math,binding_sign_title,binding_sign_math, frame
        ]

        signs_to_fade_out = [sign_plus_minus , sign_plus ,sign_minus, brace, label,linej,vertical_segment ]
        self.wait(3)

        # Fade out the objects
        self.play(*[FadeOut(obj) for obj in equation_to_fade_out2], run_time=2)

        self.play(*[FadeOut(obj) for obj in signs_to_fade_out], run_time=2)


        title_chapter_son = Text(
            "The Son",
            font="Arial",
            t2f={"font": "Consolas", "words": "Consolas"},
            t2c={"God": YELLOW, "words": GREEN}
        )

        self.wait(8)

        # create a horizontal line
        linej = Line(start=[-4, 2, 0], end=[-3, 2, 0], color=YELLOW)

        # calculate the shift needed to move the left endpoint of the line to the origin
        shift_vector = np.array([4, 0, 0]) * 1

        self.add(linej)

        # animate the line shifting to the origin
        self.play(linej.animate.shift(shift_vector), run_time = 15)

        self.wait(4)



        frame_chapter = Rectangle(width=FRAME_WIDTH, height=FRAME_HEIGHT, color=BLACK, fill_opacity=1, stroke_width=2)
        self.add(frame_chapter)


        self.play(Write(title_chapter_son.shift(UP), run_time=0.1))
        self.wait(8)
        self.play(FadeOut(title_chapter_son, run_time=0.1))

        self.remove(frame_chapter)
        self.wait(4)

        # create a Tex object for the label "t=0"
        label_t0 = Text("t = 0", color=GREY, font_size=32).next_to(linej.get_end(), 2*RIGHT, buff=0.5)

        label_t0.align_to(linej, DOWN)

        self.add(label_t0)

        # create a rectangle that overlaps with the line
        rectangle = Rectangle(height=0.01, width=1, color=YELLOW,stroke_width=0.2)
        rectangle.move_to([0.5, 2-0.005, 0])



        # create a rectangle that overlaps with the line
        rectangle_descending = Rectangle(height=0.01, width=1, color=YELLOW, stroke_width=0)
        rectangle_descending.move_to([0.5, 2-0.005, 0])


        # add the line and rectangle to the scene
        self.add(rectangle_descending)


        # fill the rectangle with blue color
        rectangle_descending.set_fill(GREY, opacity=0.4)

        run_time_rect = 4
        increase_height_anim = UpdateFromFunc(
            rectangle,
            lambda rect: rect.set_height(rect.get_height() + 1, stretch=True).next_to(linej, DOWN, buff=0)
        )

        # Create line
        line_overlap = Line(rectangle_descending.get_corner(DL), rectangle_descending.get_corner(DR), color=YELLOW) #.shift([0,0,-0.001])
        self.add(line_overlap)



        # add the father dot again to manage the overall
        self.add(father_dot)

        line_overlap.add_updater(lambda l : l.become(Line(rectangle_descending.get_corner(DL), rectangle_descending.get_corner(DR), color=YELLOW).shift([0,0,-0.001])))



        # Play the animation
        self.play(rectangle_descending.animate.set_height(2, stretch=True).next_to(linej, DOWN, buff=0), run_time=4)

        line_overlap.clear_updaters()
        rectangle_descending.clear_updaters()

        # create a Tex object for the label "t=0"
        label_t1 = Text("t = 1", color=GREY, font_size=32).next_to(line_overlap.get_end(), 2*RIGHT, buff=0.5)

        label_t1.align_to(line_overlap, DOWN)

        self.add(label_t1)

        vertical_lo_segment = Line(line_overlap.get_end() - 0.1 * UP, line_overlap.get_end() + 0.1 * UP)
        self.play(FadeIn(vertical_lo_segment),run_time=2)


        self.wait(4)

        self.play(label_t1.animate.shift(0.5*UP), run_time=1.5)



        top_point = np.array([1, 2, 0])
        bottom_point = np.array([0, 0, 0])
        curve = ArcBetweenPoints( top_point, bottom_point, angle=-TAU / 4, radius=1.5, color=YELLOW)


        #self.play(Write(nicene3_bis.to_edge(DOWN).shift(0.5*UP)), run_time=4)


        top_point = np.array([1, 2, 0])
        bottom_point = np.array([0, 0, 0])

        travel_creating_dot = Dot([1, 0, 0])
        travel_creating_dot.set_opacity(0)

        travel_creating_dot2 = Dot([1, 0, 0])
        travel_creating_dot2.set_opacity(1)

        curve = CurvedArrow( top_point, travel_creating_dot.get_center(), angle=-TAU / 4, radius=1.5,  color=YELLOW)
        curve2 = CurvedArrow(top_point, travel_creating_dot2.get_center(), angle=-TAU / 4, radius=1.5, color=WHITE)


        self.play(AnimationGroup(FadeOut(rectangle.set_fill(YELLOW, opacity=1), scale=10000), AnimationGroup(ShowCreation(curve2),ShowCreation(curve)),lag_ratio=0.2),run_time = 5)
        dotrest = Dot(color='#808080', opacity=1)
        dotrest.move_to(ORIGIN) #axes.c2p(0, 0))

        def update_curve(curve):
            # top_point and travel_creating_dot.get_center() are assumed to be numpy arrays
            distance = np.sqrt((travel_creating_dot.get_center()[0] - 1) ** 2 +
                               (travel_creating_dot.get_center()[1] - 0) ** 2 +
                               (travel_creating_dot.get_center()[2] - 0) ** 2)


            updated_curve = CurvedArrow(top_point, travel_creating_dot.get_center(), angle=-TAU / 4 + ((distance)/6 * TAU / 4 ) , radius=1.5, color=YELLOW)

            #updated_curve.add_tip(arrow_tip)
            curve.become(updated_curve)

        left_point = linej.get_start()
        left_x_coord = left_point[0]

        print("The x-coordinate of the left end-point of linej is:", left_x_coord)

        center_point = travel_creating_dot.get_center() #.axes
        center_x_coord = center_point[0]
        center_y_coord = center_point[1]




        print("The coordinates of the center of axes are:", center_x_coord, center_y_coord)

        def update_curve2(curve):
            # top_point and travel_creating_dot.get_center() are assumed to be numpy arrays
            distance = np.sqrt((travel_creating_dot.get_center()[0] - 1) ** 2 +
                               (travel_creating_dot.get_center()[1] - 0) ** 2 +
                               (travel_creating_dot.get_center()[2] - 0) ** 2)

            # travel_creating_dot2.get_center()
            updated_curve = CurvedArrow(top_point, [1 / travel_creating_dot.get_center()[0], 0, 0], angle=-TAU / 4 + ((distance)/9 * TAU / 4 ) , radius=1.5, color=YELLOW)
            #updated_curve.add_tip(arrow_tip)
            curve.become(updated_curve)

        def update_curve_vanishing(curve):
            # top_point and travel_creating_dot.get_center() are assumed to be numpy arrays
            distance = np.sqrt((travel_creating_dot.get_center()[0] - 1) ** 2 +
                               (travel_creating_dot.get_center()[1] - 0) ** 2 +
                               (travel_creating_dot.get_center()[2] - 0) ** 2)

            updated_curve = CurvedArrow(top_point, travel_creating_dot.get_center(), angle=-TAU / 4 + ((distance) / 6 * TAU / 4),
                                        radius=1.5, color=YELLOW, stroke_opacity=(distance) ** (4/2))
            # updated_curve.add_tip(arrow_tip)
            updated_curve.tip.set_opacity((distance) ** (4/2))
            #updated_curve.set_opacity((distance) / 6)
            curve.become(updated_curve)

        def update_curve2_vanishing(curve):
            # top_point and travel_creating_dot.get_center() are assumed to be numpy arrays
            distance = np.sqrt((travel_creating_dot.get_center()[0] - 1) ** 2 +
                               (travel_creating_dot.get_center()[1] - 0) ** 2 +
                               (travel_creating_dot.get_center()[2] - 0) ** 2)
            #travel_creating_dot2.get_center()
            updated_curve = CurvedArrow(top_point, [1 / travel_creating_dot.get_center()[0], 0, 0],
                                        angle=-TAU / 4 + ((distance) / 9 * TAU / 4), radius=1.5, color=YELLOW, stroke_opacity=(distance) ** (4/2))
            updated_curve.tip.set_opacity((distance) ** (4/2))

            # updated_curve.set_opacity((distance) / 9)
            # updated_curve.add_tip(arrow_tip)
            curve.become(updated_curve)


        curve.add_updater(lambda m: update_curve(m))

        curve2.add_updater(lambda m: update_curve2(m))


        #line_t = Line(np.array([0, 0, 0]), np.array([0, 2, 0]))
        #self.add(line_t)
        line = Line(np.array([1, 0, 0]), np.array([8, 0, 0]))
        line_rev = Line(np.array([8, 0, 0]), np.array([1, 0, 0]))
        line2 = Line(np.array([0, 0, 0]),np.array([-8, 0, 0]))
        line2_rev = Line(np.array([-8, 0, 0]), np.array([0, 0, 0]))

        # todo avoid overlap seems alright with line_t actually

        seg_created_light = Line(ORIGIN, ORIGIN, color=YELLOW, stroke_width=5, stroke_opacity=0.5)
        seg_created2 = Line(ORIGIN, ORIGIN, color=WHITE, stroke_width=5, stroke_opacity=0.5)

        vanish_offset = 0.02
        # Add updaters to the lines
        seg_created_light.add_updater(lambda l: l.put_start_and_end_on(ORIGIN+[vanish_offset,0,0], travel_creating_dot.get_center()).set_opacity(0.5))
        seg_created2.add_updater(lambda l: l.put_start_and_end_on(ORIGIN-[vanish_offset,0,0], [1 / travel_creating_dot.get_center()[0], 0, 0]).set_opacity(0.5))

        # Add the dot and the lines to the scene
        self.add(seg_created_light, seg_created2)
        self.add(dotrest)
        self.add(father_dot) ## bring to front

        seg_created_light.put_start_and_end_on(ORIGIN, RIGHT)
        self.add(father_dot) ## bring to front


        self.play(MoveAlongPath(travel_creating_dot, line), run_time=3,rate_func = linear)

        seg_created_light.clear_updaters()
        seg_created2.clear_updaters()

        curve.add_updater(lambda m: update_curve_vanishing(m))
        curve2.add_updater(lambda m: update_curve2_vanishing(m))
        self.wait(8)

        self.play(MoveAlongPath(travel_creating_dot, line_rev), run_time=2, rate_func=linear)

        curve.clear_updaters()
        curve2.clear_updaters()





        #### THE SON CHAPTER EQUATIONS #####


        frame = Rectangle(width=FRAME_WIDTH*1.2 / 3, height=FRAME_HEIGHT*0.85, color=WHITE, fill_opacity=1, stroke_width=2)

        font_eq = 24
        font_title = 20

        self.play(Write(frame.to_edge(LEFT)), run_time=3)


        intro_title = TexText("""$ \\textbf{Number as Space-Time and Teleology:}$ """, font_size=font_title)
        intro_title.set_color(BLACK)

        intro_title.align_to(frame, LEFT).shift(margin_left)
        intro_title.align_to(frame, UP).shift(margin_up)
        self.add(intro_title)

        next = intro_title

        # Create a math equation using TexText
        father_1 = TexText(r"$x = (e_{x},\theta_{L_{o}},\sigma_{x}) \in \mathbb{R}$", font_size=font_eq, color=BLACK)
        father_1.set_color(BLACK)

        # Position the equation within the frame
        # father_1.move_to(frame.get_corner(UL) + 0.2 * DOWN + 0.2 * RIGHT)
        father_1.align_to(frame, LEFT).shift(margin_left)
        father_1.align_to(next, UP).shift(margin_up)
        self.add(father_1)

        father_2 = TexText("""
                   $\\textnormal{where } e_{x} \in (\mathbb{E},+_{\mathbb{E}},\\times_{\mathbb{E}})  \\newline \\textnormal{      } \sigma_{x} \in (\mathbb{S}=\{+_{\mathbb{S}},-_{\mathbb{S}},+-_{\mathbb{S}}\},\\times_{\mathbb{S}})$"""
                           , font_size=font_eq, color=BLACK)


        father_2.set_color(BLACK)
        # father_2.set_fill(BLACK)

        father_2.align_to(father_1, LEFT)
        father_2.align_to(father_1.get_bottom(), UP).shift(margin_up_s)
        self.add(father_2)

        next = father_2

        self.wait(default_wait_per_paragraph)

        quantifiers_mult_math = TexText("""
                             $ \\forall x \\in \\mathbb{R} \quad \\forall e, e',e'' \\in \\mathbb{E}^{3}  $
                         """,font_size = font_eq, alignment = '\\flushleft')
        quantifiers_mult_math.set_color(BLACK)
        quantifiers_mult_math.align_to(next, LEFT)
        quantifiers_mult_math.align_to(next.get_bottom(), UP).shift(margin_up)
        self.add(quantifiers_mult_math)
        next = quantifiers_mult_math

        commutativity_mult_title = TexText("""$\\textbf{Commutativity ("symetric quantization"):}$ """, font_size = font_title, alignment = '\\flushleft')
        commutativity_mult_title.set_color(BLACK)
        commutativity_mult_math = TexText("""
                             $\\newline   (e_{x} = e \\times e') \Rightarrow (e_{x} = e' \\times e) $
                         """,font_size = font_eq, alignment = '\\flushleft')
        commutativity_mult_math.set_color(BLACK)

        commutativity_mult_title.align_to(next, LEFT)
        commutativity_mult_title.align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(commutativity_mult_title)
        next = commutativity_mult_title

        commutativity_mult_math.align_to(next, LEFT)
        commutativity_mult_math.align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(commutativity_mult_math)
        next = commutativity_mult_math



        ### INTERNAL Contraction INTERNAL EXPANSION ###


        # Step 1 : draw a curve aiming to 4

        dot_mult_target = Dot([4,0,0]).set_opacity(0)

        curve_target = CurvedArrow(top_point, dot_mult_target.get_center(), angle=-TAU / 4+0.45*TAU/4, radius=1.5, color=YELLOW)
        #label_space_e_pi = TexText("$e_{\pi}$", color=GREY).move_to(brace.get_center()).shift(0.5*DOWN+0.4*LEFT).shift(0.5*DOWN)
        label_time_e_target = TexText("$e_{x} = e \\times e'$", color=GREY).next_to(curve_target.get_center(), RIGHT).shift(0.5*RIGHT+0.6*UP)

        self.play(AnimationGroup(FadeOut(label_t0),FadeOut(label_t1)),run_time=2)
        self.play(AnimationGroup(ShowCreation(curve_target),lag_ratio=0.2), run_time=5)
        self.play(FadeIn(label_time_e_target), run_time=1)

        g_mult_total = Group(curve_target,label_time_e_target)

        # Step 2 : Compute the points on the line for a split in 1.5 and 3/4  C
        curve_target = CurvedArrow(top_point, dot_mult_target.get_center(), angle=-TAU / 4+0.45*TAU/4, radius=1.5, color=YELLOW)

        alpha_mult = 0.4 ## 8/5 * 5/2

        distance_label_mult = 0.5
        distance_label_mult_big = 0.65

        intermediary_commu_point = (dot_mult_target.get_center())*alpha_mult + (top_point)*(1-alpha_mult )

        curve_commu_top = CurvedArrow(top_point, intermediary_commu_point, angle=-TAU / 4+0.45*TAU/4, radius=1.5, color=YELLOW)
        curve_commu_bottom = CurvedArrow(intermediary_commu_point, dot_mult_target.get_center(), angle=-TAU / 4 + 0.45 * TAU / 4,radius=1.5, color=YELLOW)

        label_commu_top = TexText("$e$", color=GREY).move_to((top_point+ intermediary_commu_point)/2, RIGHT).shift(2/3*distance_label_mult * RIGHT + distance_label_mult * UP)
        label_commu_bottom = TexText("$e'$", color=GREY).move_to((intermediary_commu_point + dot_mult_target.get_center())/2, RIGHT).shift(2/3*distance_label_mult_big * RIGHT + distance_label_mult_big * UP)

        g_mult_split = Group(curve_commu_top,curve_commu_bottom,label_commu_top,label_commu_bottom)

        # self.play(FadeOut(pi_leibniz), run_time=1)
        self.wait(4)

        self.play(AnimationGroup(FadeIn(g_mult_split),FadeOut(g_mult_total), lag_ratio = 0.2), run_time=2) #

        print(curve_commu_top.get_end())

        self.wait(4)

        shift_remain_bottom = np.array([-0.14999998, 0.10000002, 0.        ])
        shift_remain_top = np.array([0.14999986, -0.10000005, 0.        ])
        self.play(AnimationGroup(curve_commu_bottom.animate.shift(top_point-intermediary_commu_point).shift(shift_remain_bottom).scale(5 / 6),label_commu_bottom.animate.shift(top_point-intermediary_commu_point).shift(shift_remain_bottom),
              curve_commu_top.animate.shift(5 / 6*(dot_mult_target.get_center()-intermediary_commu_point)).shift(shift_remain_top).scale(5/4),label_commu_top.animate.shift(5 / 6*(dot_mult_target.get_center()-intermediary_commu_point)).shift(shift_remain_top)), run_time = 3) #
        # Compute the scaling shift : print(dot_mult_target.get_center() - curve_commu_top.get_end())

        label_time_e_target_commuted = TexText("$e_{x} = e' \\times e $", color=GREY).next_to(curve_target.get_center(), RIGHT).shift(0.5*RIGHT+0.6*UP)


        g_mult_total_commuted = Group(curve_target,label_time_e_target_commuted)

        self.wait(4)

        self.play(AnimationGroup(FadeIn(g_mult_total_commuted),FadeOut(g_mult_split)), run_time=2) #

        # roll back
        self.wait(8)

        self.play(AnimationGroup(FadeIn(g_mult_split),FadeOut(g_mult_total_commuted), lag_ratio = 0.2), run_time=2)  #

        self.play(AnimationGroup(curve_commu_bottom.animate.shift(-(top_point-intermediary_commu_point)).shift(-shift_remain_bottom).scale(6 / 5),label_commu_bottom.animate.shift(-(top_point-intermediary_commu_point)).shift(-shift_remain_bottom),
              curve_commu_top.animate.shift(-5 / 6*(dot_mult_target.get_center()-intermediary_commu_point)).shift(-shift_remain_top).scale(4/5),label_commu_top.animate.shift(-5 / 6*(dot_mult_target.get_center()-intermediary_commu_point)).shift(-shift_remain_top)), run_time = 3) #
        # Compute the scaling shift : print(dot_mult_target.get_center() - curve_commu_top.get_end())

        self.wait(4)

        self.play(AnimationGroup(FadeOut(g_mult_split), FadeIn(g_mult_total)), run_time=2)


        # Step 3 : Scale the arrows


        # Step 4 : Do the Same with associativity


        self.wait(6)

        curve_target.clear_updaters()
        self.remove(g_mult_total)
        self.remove(g_mult_total_commuted)
        self.play(FadeOut(label_time_e_target),FadeOut(curve_target), run_time=1)


        associativity_mult_title = TexText("""$ \\textbf{Associativity ("simultaneous quantization"):}$ """, font_size = font_title)
        associativity_mult_title.set_color(BLACK)
        associativity_mult_math = TexText("""$\\newline   (e_{x} = e \\times ( e' \\times e'' )) \Rightarrow (e_{x} = (e \\times e') \\times e'') $
                         """,font_size = font_eq, alignment = '\\flushleft')
        associativity_mult_math.set_color(BLACK)

        associativity_mult_title.align_to(frame, LEFT).shift(margin_left)
        associativity_mult_title.align_to(next.get_bottom(), UP).shift(margin_up)
        self.add(associativity_mult_title)
        next = associativity_mult_title


        associativity_mult_math.align_to(frame, LEFT).shift(margin_left)
        associativity_mult_math.align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(associativity_mult_math)
        next = associativity_mult_math

        self.wait(8)

        # Create the list of arrows

        dot_mult_target_travel = Dot([4, 0, 0]).set_opacity(0)

        def scale_arrow_tip(carrow,boolean_1=True):
            carrow.tip.scale(0.75)
            if (dot_mult_target.get_center()[0]-dot_mult_target_travel.get_center()[0] < 0.05) and boolean_1:
                carrow.set_opacity(0)
            return carrow

        curve_asso_2 = CurvedArrow(dot_mult_target.get_center(), dot_mult_target.get_center(), angle=-TAU / 4 + 0.45 * TAU / 4, radius=1.5,color=YELLOW)
        curve_asso_2.add_updater(lambda l: l.become(scale_arrow_tip(CurvedArrow(dot_mult_target.get_center()*1/5+dot_mult_target_travel.get_center()*(1-1/5), dot_mult_target.get_center()*2/5+dot_mult_target_travel.get_center()*(1-2/5), angle=-TAU / 4 + 0.45 * TAU / 4, radius=1.5,color=YELLOW))))

        curve_asso_3 = CurvedArrow(dot_mult_target.get_center(), dot_mult_target.get_center(), angle=-TAU / 4 + 0.45 * TAU / 4, radius=1.5,color=YELLOW)
        curve_asso_3.add_updater(lambda l: l.become(scale_arrow_tip(CurvedArrow(dot_mult_target.get_center()*2/5+dot_mult_target_travel.get_center()*(1-2/5), dot_mult_target.get_center()*3/5+dot_mult_target_travel.get_center()*(1-3/5), angle=-TAU / 4 + 0.45 * TAU / 4, radius=1.5,color=YELLOW))))

        curve_asso_4 = CurvedArrow(dot_mult_target.get_center(), dot_mult_target.get_center(), angle=-TAU / 4 + 0.45 * TAU / 4, radius=1.5,color=YELLOW)
        curve_asso_4.add_updater(lambda l: l.become(scale_arrow_tip(CurvedArrow(dot_mult_target.get_center()*3/5+dot_mult_target_travel.get_center()*(1-3/5), dot_mult_target.get_center()*4/5+dot_mult_target_travel.get_center()*(1-4/5), angle=-TAU / 4 + 0.45 * TAU / 4, radius=1.5,color=YELLOW))))

        curve_asso_5 = CurvedArrow(dot_mult_target.get_center(), dot_mult_target.get_center(), angle=-TAU / 4 + 0.45 * TAU / 4, radius=1.5,color=YELLOW)
        curve_asso_5.add_updater(lambda l: l.become(scale_arrow_tip(CurvedArrow(dot_mult_target.get_center()*4/5+dot_mult_target_travel.get_center()*(1-4/5), dot_mult_target.get_center(), angle=-TAU / 4 + 0.45 * TAU / 4, radius=1.5,color=YELLOW))))



        label_time_e_target_asso = TexText("$e_{x} $", color=GREY).next_to(curve_target.get_center(),RIGHT).shift(0.5 * RIGHT + 0.6 * UP)
        curve_target = CurvedArrow(top_point, dot_mult_target.get_center(), angle=-TAU / 4 + 0.45 * TAU / 4, radius=1.5,color=YELLOW)
        curve_target.tip.scale(0.75)
        self.play(AnimationGroup(FadeIn(label_time_e_target_asso),ShowCreation(curve_target)), run_time=2)

        self.wait(4)


        curve_target.add_updater(lambda l: l.become(scale_arrow_tip(CurvedArrow(top_point, dot_mult_target.get_center()*1/5+dot_mult_target_travel.get_center()*(1-1/5), angle=-TAU / 4 + 0.45 * TAU / 4, radius=1.5,color=YELLOW),False)))

        self.add(curve_target)
        self.add(curve_asso_2)
        self.add(curve_asso_3)
        self.add(curve_asso_4)
        self.add(curve_asso_5)


        self.play(dot_mult_target_travel.animate.move_to(top_point),run_time=4)

        self.wait(8)

        self.play(dot_mult_target_travel.animate.move_to(dot_mult_target.get_center()), run_time=4)

        self.wait( default_wait_per_paragraph)
        self.remove(curve_asso_2)
        self.remove(curve_asso_3)
        self.remove(curve_asso_4)
        self.remove(curve_asso_5)
        self.remove(dot_mult_target)
        self.play(FadeOut(label_time_e_target_asso),FadeOut(curve_target), run_time=1)


        distributivity_title = TexText("""$ \\textbf{Distributivity of }\\times\\textbf{ over }+\\textbf{  ("time flows through}\\newline \\textbf{space"):}$ """, font_size = font_title, alignment = '\\flushleft')
        distributivity_title.set_color(BLACK)
        distributivity_math = TexText("""    $\\newline (e_{x} = e \\times (e' + e'') ) \Rightarrow  (e_{x} = e \\times e' + e \\times  e'') )  \quad       $  """,font_size = font_eq, alignment = '\\flushleft')
        distributivity_math.set_color(BLACK)

        distributivity_title.align_to(frame, LEFT).shift(margin_left)
        distributivity_title.align_to(next.get_bottom(), UP).shift(margin_up)
        self.add(distributivity_title)
        next = distributivity_title

        distributivity_math.align_to(frame, LEFT).shift(margin_left)
        distributivity_math.align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(distributivity_math)
        next = distributivity_math

        ## Create a line size 4 ##

        # create a horizontal line
        line_distributivity = Line(start=[0, 0, 0], end=[5, 0, 0], color=YELLOW)

        dot_distribution_travel = Dot(point=[0, 0, 0], color=WHITE).set_opacity(0)

        self.wait(12)

        curve_target_distri = CurvedArrow(top_point, [5,0,0], angle=-TAU / 4+0.45*TAU/4, radius=1.5, color=YELLOW)
        #label_space_e_pi = TexText("$e_{\pi}$", color=GREY).move_to(brace.get_center()).shift(0.5*DOWN+0.4*LEFT).shift(0.5*DOWN)
        label_target_distri = TexText("$e_{x}$", color=GREY).next_to(curve_target_distri.get_center(), RIGHT).shift(0.5*RIGHT+0.6*UP)

        self.play(FadeIn(label_target_distri), ShowCreation(curve_target_distri), run_time=2)

        self.wait(4)

        factor_distrib = 4/2

        def get_extremity_x(factor_x=1):
            return factor_x*(5 - factor_distrib * dot_distribution_travel.get_center()[1])

        def vertical_segment_distri(factor_x=1):
            l = Line([get_extremity_x(factor_x), dot_distribution_travel.get_center()[1], 0] - 0.1 * UP,[get_extremity_x(factor_x), dot_distribution_travel.get_center()[1], 0] + 0.1 * UP,color=WHITE)
            if dot_distribution_travel.get_center()[1] > 1.8:
                l.set_opacity(0)
            return l

        vertical_segment_start = vertical_segment_distri(0)
        vertical_segment_start.add_updater(lambda l : l.become(vertical_segment_distri(0)))

        vertical_segment_1 = vertical_segment_distri(0.2)
        vertical_segment_1.add_updater(lambda l : l.become(vertical_segment_distri(0.2)))

        vertical_segment_2 = vertical_segment_distri(0.4)
        vertical_segment_2.add_updater(lambda l: l.become(vertical_segment_distri(0.4)))

        vertical_segment_3 = vertical_segment_distri(0.6)
        vertical_segment_3.add_updater(lambda l : l.become(vertical_segment_distri(0.6)))

        vertical_segment_4 = vertical_segment_distri(0.8)
        vertical_segment_4.add_updater(lambda l: l.become(vertical_segment_distri(0.8)))

        vertical_segment_5 = vertical_segment_distri(1)
        vertical_segment_5.add_updater(lambda l: l.become(vertical_segment_distri(1)))

        line_distributivity.add_updater(lambda l: l.put_start_and_end_on(np.array([get_extremity_x(0),dot_distribution_travel.get_center()[1],0]), np.array([get_extremity_x(1),dot_distribution_travel.get_center()[1],0])))

        self.add(vertical_segment_start)
        self.add(vertical_segment_1)
        self.add(vertical_segment_2)
        self.add(vertical_segment_3)
        self.add(vertical_segment_4)
        self.add(vertical_segment_5)
        self.add(line_distributivity)

        self.wait(8)

        self.play(dot_distribution_travel.animate.shift(2*UP), run_time=6)
        self.play(dot_distribution_travel.animate.shift(2 * DOWN), run_time=6)

        self.wait(4)
        self.play(dot_distribution_travel.animate.shift(2 * UP ), run_time=3)
        self.play(dot_distribution_travel.animate.shift(2 * DOWN), run_time=3)

        self.wait(4)

        objects_distri_to_fade_out = [vertical_segment_start,vertical_segment_1,vertical_segment_2,vertical_segment_3,vertical_segment_4,vertical_segment_5,line_distributivity,curve_target_distri,label_target_distri]

        # Fade out the objects
        self.play(*[FadeOut(obj) for obj in objects_distri_to_fade_out],run_time=2)



        son_eq_title = TexText("""$ \\textbf{The Son ("existence of the unit"):}$ """, font_size = font_title)
        son_eq_title.set_color(BLACK)
        son_eq_math = TexText("""    $\\exists 1 \in \mathbb{R}, \\newline 
                                    \sigma_{1}= + \\newline 
                                    \\forall e \in \mathbb{E}^{*}, \exists e' \in \mathbb{E}, (e_{1} = e \\times e')  \\newline
                                    \\forall e \in \mathbb{E}, e = e_{1} \\times e  
                                    $  """,font_size = font_eq, alignment = '\\flushleft')

        son_eq_math.set_color(BLACK)

        son_eq_title.align_to(frame, LEFT).shift(margin_left)
        son_eq_title.align_to(next.get_bottom(), UP).shift(margin_up)
        self.add(son_eq_title)
        next = son_eq_title

        son_eq_math.align_to(frame, LEFT).shift(margin_left)
        son_eq_math.align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(son_eq_math)
        next = son_eq_math

        self.wait(4 * default_wait_per_paragraph)

        self.wait(20)

        # List of objects to fade out

        objects_mult_1_to_fade = [
            intro_title,
            father_1,
            father_2,
            quantifiers_mult_math,
            commutativity_mult_title,
            commutativity_mult_math,
            associativity_mult_title,
            associativity_mult_math,
            distributivity_title,
            distributivity_math,
            son_eq_title,
            son_eq_math,
            # order_and_substract_title,
            # order_and_substract_math,
            # #substraction_title,
            # substraction_math,
            # addition_title,
            # addition_math,
            # real_ordering_title,
            # real_ordering_math,
            # binding_sign_title,
            # binding_sign_math,
        ]

        # Fade out the objects
        self.play(*[FadeOut(obj) for obj in objects_mult_1_to_fade],run_time=2)

        intro_title = TexText("""$ \\textbf{The Sign rule ("the Golden rule"):}$ """, font_size=font_title)
        intro_title.set_color(BLACK)

        intro_title.align_to(frame, LEFT).shift(margin_left)
        intro_title.align_to(frame, UP).shift(margin_up)
        self.add(intro_title)

        next = intro_title


        # Create a math equation using TexText
        father_1 = TexText(""" $
                           + = + \\times_{\mathbb{S}} + = - \\times_{\mathbb{S}} - \\newline
                           - = + \\times_{\mathbb{S}} - = - \\times_{\mathbb{S}} + \\newline
                           \\forall \\sigma \\in (\mathbb{S} = \\{+_{\mathbb{S}},-_{\mathbb{S}},+-_{\mathbb{S}}\\},\\times_{\mathbb{S}}), \\newline 
                           \\textbf{+-} = \\textbf{+-} \\times_{\mathbb{S}} \\sigma =  \\sigma \\times_{\mathbb{S}} \\textbf{+-}  
                           $""", font_size=font_eq, color=BLACK, alignment = '\\flushleft')
        father_1.set_color(BLACK)

        # Position the equation within the frame
        father_1.align_to(frame, LEFT).shift(margin_left)
        father_1.align_to(next, UP).shift(margin_up)
        self.add(father_1)

        next = father_1

        self.wait(2 * default_wait_per_paragraph)

        commutativity_title = TexText("""$ \\textbf{Multiplication :}$ """, font_size = font_title)
        commutativity_title.set_color(BLACK)
        commutativity_math = TexText("""$ \\forall x, y \\in \\mathbb{R}^{2}, \\newline
                              x \\times y = ( e_{x} \\times e_{y}, \\theta_{L_{o}}, \\sigma_{x} \\times \\sigma_{y} ) $
                         """,font_size = font_eq, alignment = '\\flushleft')
        commutativity_math.set_color(BLACK) #\\forall e, e' \\in \\mathbb{E}^{2},\\newline

        commutativity_title.align_to(next, LEFT)
        commutativity_title.align_to(next.get_bottom(), UP).shift(margin_up)
        self.add(commutativity_title)
        next = commutativity_title

        commutativity_math.align_to(next, LEFT)
        commutativity_math.align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(commutativity_math)
        next = commutativity_math

        self.wait(default_wait_per_paragraph)



        # Wait for a few seconds
        self.wait(2)

        objects_mult_2_to_fade = [
            #label_t0,
            #label_t1,
            seg_created_light,
            seg_created2,
            vertical_lo_segment,
            rectangle_descending,
            linej,
            line_overlap
            # order_and_substract_title,
            # order_and_substract_math,
            # #substraction_title,
            # substraction_math,
            # addition_title,
            # addition_math,
            # real_ordering_title,
            # real_ordering_math,
            # binding_sign_title,
            # binding_sign_math,
        ]

        # Fade out the objects
        self.play(*[FadeOut(obj) for obj in objects_mult_2_to_fade],run_time=2)


        ## START GRAPH OF SIGNS ##

        text_sign_rule_title = Text("The Sign rule", color=WHITE, font_size=32)
        text_sign_rule_version1 = Text("(Version 1)", color=WHITE, font_size=24)
        text_sign_rule_version1.align_to(text_sign_rule_version1, LEFT)
        title_sign_v1 = VGroup(text_sign_rule_title, text_sign_rule_version1)
        title_sign_v1.arrange(DOWN)


        #title_sign_v1 = TexText("\\textbf{The Sign rule } \\newline \\textnormal{newline(Version 1)}", color=WHITE, font_size=32, alignment = '\\flushleft')
        title_sign_v1.align_to(frame.get_right(), LEFT).shift(0.5*RIGHT)
        text_sign_rule_version1.align_to(text_sign_rule_title, LEFT)
        title_sign_v1.align_to(frame, UP)

        circle_light = Circle(radius=0.8, fill_color=YELLOW, fill_opacity=0.5, stroke_color=YELLOW).move_to([4, 1.5-0.24, 0])

        circle_shadow = Circle(radius=0.8, fill_color=WHITE, fill_opacity=0.5, stroke_color=WHITE).move_to([4, -1.5+0.24, 0])

        margin_loop = 0.1


        # Create circular arrows as loops
        arrow_plus_to_minus = CurvedArrow(
            circle_light.get_right(), circle_shadow.get_right(),
            angle=-TAU / 4, radius=0.3, color=WHITE
        )
        arrow_minus_to_plus = CurvedArrow(
            circle_shadow.get_left(), circle_light.get_left(),
            angle=-TAU / 4, radius=0.3, color=YELLOW
        )

        # Create circular arrows
        circular_zero_arrow_plus = Arc(start_angle=-PI/2-PI/8,angle=-1.75*PI, arc_center=circle_light.get_top(), radius=0.4, color=YELLOW)
        circular_zero_arrow_plus.add_tip()
        circular_zero_arrow_plus.scale(0.3)
        circular_zero_arrow_plus.tip.scale(2)
        circular_zero_arrow_plus.shift(father_dot.get_top()-circular_zero_arrow_plus.get_bottom()).shift([0,margin_loop,0])

        circular_zero_arrow_minus = Arc(start_angle=PI/2+PI/8,angle=1.75*PI, arc_center=circle_shadow.get_bottom(), radius=0.4, color=WHITE)
        circular_zero_arrow_minus.add_tip()
        circular_zero_arrow_minus.scale(0.3)
        circular_zero_arrow_minus.tip.scale(2)
        circular_zero_arrow_minus.shift(father_dot.get_bottom()-circular_zero_arrow_minus.get_top()).shift([0,-margin_loop,0])

        sign_plus_minus = Text("+-", color=WHITE, font_size=68).set_color_by_text("+", YELLOW)

        sign_plus_minus.next_to(father_dot)

        sign_plus = Text("+", color=YELLOW, font_size=68)
        sign_plus.move_to(circle_light.get_center())
        sign_plus_love = Text("Love", color=YELLOW, font_size=22)
        sign_plus_love.move_to(circle_light.get_center())
        print(circle_light.get_center() - sign_plus.get_bottom())
        sign_plus_love.shift([0, -0.35, 0])
        # align_to(sign_plus.get_bottom(), UP)

        sign_minus = Text("-", color=WHITE, font_size=68)
        sign_minus.move_to(circle_shadow.get_center())
        sign_minus_hate = Text("Hate", color=WHITE, font_size=22)
        sign_minus_hate.move_to(circle_shadow.get_center())
        sign_minus_hate.shift([0, -0.35, 0])

        # Create circular arrows
        circular_arrow_plus_to_plus = Arc(start_angle=-PI / 2 - PI / 8, angle=-1.75 * PI, arc_center=circle_light.get_top(), radius=0.4,
                              color=YELLOW)
        circular_arrow_plus_to_plus.add_tip()
        circular_arrow_plus_to_plus.scale(0.3)
        circular_arrow_plus_to_plus.tip.scale(2)
        circular_arrow_plus_to_plus.shift(circle_light.get_top() - circular_arrow_plus_to_plus.get_bottom()).shift([0, margin_loop, 0])
        #circular_arrow_minus_to_minus = Arc(angle=PI, arc_center=circle_shadow.get_bottom(), radius=1.2, color=BLACK)

        # circular_arrow_plus_to_plus = CurvedArrow(circle_light.get_top(), circle_light.get_top()+[0.000001,0,0], angle=-TAU*0.99, radius=0.00000005, color=YELLOW)
        # circular_arrow_minus_to_minus = CurvedArrow(circle_light.get_top() , circle_light.get_top()+[0.3,0,0], angle=TAU*0.99, radius=8, color=WHITE)
        circular_arrow_minus_to_minus = Arc(start_angle=PI / 2 + PI / 8, angle=1.75 * PI, arc_center=circle_shadow.get_bottom(), radius=0.4,
                              color=WHITE)
        circular_arrow_minus_to_minus.add_tip()
        circular_arrow_minus_to_minus.scale(0.3)
        circular_arrow_minus_to_minus.tip.scale(2)
        circular_arrow_minus_to_minus.shift(circle_shadow.get_bottom() - circular_arrow_minus_to_minus.get_top()).shift([0, -margin_loop, 0])

        self.play(AnimationGroup(FadeIn(circle_light), FadeIn(circle_shadow)
                                , FadeIn(sign_plus),FadeIn(sign_minus),FadeIn(sign_plus_minus), FadeIn(title_sign_v1)), run_time=2)

        self.wait(8)

        self.play(AnimationGroup(FadeIn(sign_plus_love),FadeIn(sign_minus_hate)),run_time=2)

        self.add(sign_minus_hate)
        
        self.wait(4)

        ## add sign and message at the bottom
        sign_plus_to_plus = Text("+", color=YELLOW, font_size=44)
        sign_plus_to_plus.move_to(circle_light.get_top()).align_to(circle_light.get_top(), UP).shift([0, 1.34, 0])

        sign_plus_to_plus_int1 = Text("Loving", color=WHITE, font_size=22)
        sign_plus_to_plus_int1.move_to(circle_light.get_top()).align_to(circle_light.get_top(), UP).shift([0, 1.34, 0])
        sign_plus_to_plus_int1.shift([0, -0.35, 0])

        self.play(AnimationGroup(Write(circular_arrow_plus_to_plus),FadeIn(sign_plus_to_plus),FadeIn(sign_plus_to_plus_int1)),run_time=1)

        self.wait(2)

        ## add sign and message at the bottom
        sign_minus_to_minus = Text("+", color=WHITE, font_size=44)
        sign_minus_to_minus.move_to(circle_shadow.get_bottom()).align_to(circle_shadow.get_bottom(), UP).shift(
            [0, -0.8, 0])

        sign_minus_to_minus_int1 = Text("Loving", color=WHITE, font_size=22)
        sign_minus_to_minus_int1.move_to(circle_shadow.get_bottom()).align_to(circle_shadow.get_bottom(), UP).shift(
            [0, -0.8, 0])
        sign_minus_to_minus_int1.shift([0, -0.35, 0])

        self.play(AnimationGroup(Write(circular_arrow_minus_to_minus),FadeIn(sign_minus_to_minus),FadeIn(sign_minus_to_minus_int1)), run_time=1)

        self.wait(2)

        sign_minus_to_plus = Text("-", color=YELLOW, font_size=44)
        sign_minus_to_plus.move_to(arrow_minus_to_plus.get_center()).align_to(arrow_minus_to_plus.get_center(),
                                                                              RIGHT).shift([-0.5, 0, 0])

        sign_minus_to_plus_int1 = Text("Hating", color=WHITE, font_size=22)
        sign_minus_to_plus_int1.move_to(arrow_minus_to_plus.get_center()).align_to(arrow_minus_to_plus.get_center(),
                                                                                   RIGHT).shift([-0.5, 0, 0])
        sign_minus_to_plus_int1.shift([0, -0.35, 0])

        self.play(AnimationGroup(Write(arrow_minus_to_plus),FadeIn(sign_minus_to_plus),FadeIn(sign_minus_to_plus_int1)), run_time=1)

        self.wait(2)


        ## add sign and message on the right
        sign_plus_to_minus = Text("-", color=WHITE, font_size=44)
        sign_plus_to_minus.move_to(arrow_plus_to_minus.get_center()).align_to(arrow_plus_to_minus.get_center(),
                                                                              LEFT).shift([0.5, 0, 0])

        sign_plus_to_minus_int1 = Text("Hating", color=WHITE, font_size=22)
        sign_plus_to_minus_int1.move_to(arrow_minus_to_plus.get_center()).align_to(arrow_plus_to_minus.get_center(),
                                                                                   LEFT).shift([0.5, 0, 0])
        sign_plus_to_minus_int1.shift([0, -0.35, 0])


        self.play(AnimationGroup(Write(arrow_plus_to_minus),FadeIn(sign_plus_to_minus),FadeIn(sign_plus_to_minus_int1)), run_time=1)

        self.wait(4)


        self.play(AnimationGroup(Write(circular_zero_arrow_minus),Write(circular_zero_arrow_plus)), run_time=1)


        self.wait(8)

        sign_rule_v1 = [sign_minus_to_plus_int1,sign_plus_to_minus_int1,sign_minus_to_minus_int1,sign_plus_to_plus_int1,text_sign_rule_version1]

        sign_minus_to_plus_int2 = Text("Hiding", color=WHITE, font_size=22)
        sign_minus_to_plus_int2.move_to(arrow_minus_to_plus.get_center()).align_to(arrow_minus_to_plus.get_center(), RIGHT).shift([-0.5, 0, 0])
        sign_minus_to_plus_int2.shift([0, -0.35, 0])

        sign_plus_to_minus_int2 = Text("Hiding", color=WHITE, font_size=22)
        sign_plus_to_minus_int2.move_to(arrow_minus_to_plus.get_center()).align_to(arrow_plus_to_minus.get_center(), LEFT).shift([0.5,0,0])
        sign_plus_to_minus_int2.shift([0,-0.35,0])

        sign_minus_to_minus_int2 = Text("Spreading", color=WHITE, font_size=22)
        sign_minus_to_minus_int2.move_to(circle_shadow.get_bottom()).align_to(circle_shadow.get_bottom(), UP).shift([0,-0.8 ,0])
        sign_minus_to_minus_int2.shift([0,-0.35,0])

        sign_plus_to_plus_int2 = Text("Spreading", color=WHITE, font_size=22)
        sign_plus_to_plus_int2.move_to(circle_light.get_top()).align_to(circle_light.get_top(), UP).shift([0,1.34 ,0])
        sign_plus_to_plus_int2.shift([0,-0.35,0])



        text_sign_rule_title = Text("The Sign rule", color=WHITE, font_size=32)
        text_sign_rule_version2 = Text("(Version 2)", color=WHITE, font_size=24)
        text_sign_rule_version2.align_to(text_sign_rule_title, LEFT)
        title_sign_int2 = VGroup(text_sign_rule_title, text_sign_rule_version2)
        title_sign_int2.arrange(DOWN)


        #title_sign_v1 = TexText("\\textbf{The Sign rule } \\newline \\textnormal{newline(Version 1)}", color=WHITE, font_size=32, alignment = '\\flushleft')
        title_sign_int2.align_to(frame.get_right(), LEFT).shift(0.5*RIGHT)
        text_sign_rule_version2.align_to(text_sign_rule_title, LEFT)
        title_sign_int2.align_to(frame, UP)

        sign_rule_v2 = [sign_minus_to_plus_int2, sign_plus_to_minus_int2, sign_minus_to_minus_int2,
                        sign_plus_to_plus_int2,text_sign_rule_version2]

        self.play(*[FadeOut(obj) for obj in sign_rule_v1], run_time=2)

        self.play(*[FadeIn(obj) for obj in sign_rule_v2], run_time=2)

        self.wait(6)

        sign_graph_and_frame_to_fade_out= [
            intro_title,
            father_1,
            commutativity_title,
            commutativity_math,
            title_sign_v1,
            circular_arrow_plus_to_plus,
            circular_arrow_minus_to_minus,
            circular_zero_arrow_plus,
            circular_zero_arrow_minus,
            arrow_plus_to_minus,
            arrow_minus_to_plus,
            circle_light,
            circle_shadow,
            sign_plus_minus,
            sign_plus_love,
            sign_plus,
            sign_minus,
            sign_minus_hate,
            sign_minus_to_plus,
            #sign_minus_to_plus_int1,
            sign_plus_to_minus,
            #sign_plus_to_minus_int1,
            sign_minus_to_minus,
            #sign_minus_to_minus_int1,
            sign_plus_to_plus,
            #sign_plus_to_plus_int1,
            sign_minus_to_plus_int2,
            sign_plus_to_minus_int2,
            sign_minus_to_minus_int2,
            sign_plus_to_plus_int2,
            title_sign_int2,
            text_sign_rule_version2,
            frame,
        ]

        self.play(*[FadeOut(obj) for obj in sign_graph_and_frame_to_fade_out], run_time=2)

        objects_to_fade_before_holy_spirit_in = [linej, line_overlap, rectangle_descending, vertical_lo_segment]

        self.play(*[FadeIn(obj) for obj in objects_to_fade_before_holy_spirit_in], run_time=2)
        self.add(father_dot)

        seg_created_light.put_start_and_end_on(ORIGIN, 100*RIGHT)
        self.add(father_dot) # bring to front
        self.play(FadeIn(seg_created_light), run_time=4)
        self.add(father_dot)  # bring to front
        
        # Add a white dot at the center-right of the screen
        center_right_dot = Dot(color=WHITE)
        center_right_dot.move_to(self.camera.frame.get_right() + self.camera.frame.get_center())



        # Add a line to act as a tip
        arrow_tip_length = 0.2
        arrow = Arrow(
            center_right_dot.get_center(),
            center_right_dot.get_center() + LEFT * arrow_tip_length,
            buff=0.1,  # Buffer to separate the arrowhead from the dot
            color=WHITE
        )
        self.add(arrow)


        sign_holy_spirit = TexText("\\textbf{>}", color=WHITE, font_size=44)
        sign_holy_spirit.move_to(self.camera.frame.get_right() + self.camera.frame.get_center())
        sign_holy_spirit.align_to(self.camera.frame.get_right(), RIGHT)
        sign_holy_spirit.add_updater(lambda l: l.become(l.move_to(self.camera.frame.get_right() + self.camera.frame.get_center()).align_to(self.camera.frame.get_right(), RIGHT)))


        sign_holy_spirit_label = TexText("$+\\infty$", color=YELLOW, font_size=62)
        sign_holy_spirit_label.move_to(self.camera.frame.get_right() + self.camera.frame.get_center())
        sign_holy_spirit_label.align_to(self.camera.frame.get_right(),RIGHT).shift(LEFT*0.3)


        print(circle_light.get_center()-sign_plus.get_bottom())
        sign_holy_spirit_label.shift([0,+0.7,0])
        sign_holy_spirit_label.add_updater(lambda l: l.become(
            l.move_to(self.camera.frame.get_right() + self.camera.frame.get_center()).align_to(
                self.camera.frame.get_right(), RIGHT).shift(LEFT * 0.3).shift([0, +0.7, 0])))

        self.add(sign_holy_spirit)

        self.add(sign_holy_spirit_label)

        # create a dot squeezing the screen
        dot_squeeze = Dot(color=WHITE, radius=0.05, fill_opacity=0)
        dot_squeeze.move_to([1, 0, 0])
        self.add(dot_squeeze)



        #### THE HOLY SPIRIT ###
        self.wait(4)

        title_father = Text(
            "The Holy Spirit",
            font="Arial",
            t2f={"font": "Consolas", "words": "Consolas"},
            t2c={"God": YELLOW, "words": GREEN}
        )


        frame_chapter = Rectangle(width=FRAME_WIDTH, height=FRAME_HEIGHT, color=BLACK, fill_opacity=1, stroke_width=2)
        self.add(frame_chapter)


        self.play(Write(title_father.shift(UP), run_time=0.1))
        self.wait(8)
        self.play(FadeOut(title_father, run_time=0.1))

        self.remove(frame_chapter)
        self.wait(4)

        frame = Rectangle(width=FRAME_WIDTH*1.2 / 3, height=FRAME_HEIGHT*0.85, color=WHITE, fill_opacity=1, stroke_width=2)

        font_eq = 24
        font_title = 20

        self.play(AnimationGroup(Write(frame.to_edge(LEFT))), run_time=3)

        intro_holy_spirit_title = TexText("""$ \\textbf{Closure of extensions under addition ("The }\\newline \\textbf{Holy Spirit as an attractor to Himself"):}$ """, font_size=font_title, alignment = '\\flushleft')
        intro_holy_spirit_title.set_color(BLACK)

        intro_holy_spirit_title.align_to(frame, LEFT).shift(margin_left)
        intro_holy_spirit_title.align_to(frame, UP).shift(margin_up)
        self.add(intro_holy_spirit_title)

        next = intro_holy_spirit_title

        # Create a math equation using TexText
        intro_holy_spirit_math = TexText("""$\\forall x,y \\in \\mathbb{R}^{2}, \exists z \\in \\mathbb{R}, e_{x} + e_{y} = e_{z} $""", font_size=font_eq, color=BLACK, alignment = '\\flushleft')
        intro_holy_spirit_math.set_color(BLACK)

        # Position the equation within the frame
        # father_1.move_to(frame.get_corner(UL) + 0.2 * DOWN + 0.2 * RIGHT)
        intro_holy_spirit_math .align_to(frame, LEFT).shift(margin_left)
        intro_holy_spirit_math .align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(intro_holy_spirit_math )

        next = intro_holy_spirit_math

        self.wait(2 * default_wait_per_paragraph)



        holy_spirit_def_title = TexText("""$\\textbf{Existence of } +\infty \\textbf{ ("The Holy Spirit as the positive}\\newline \\textbf{supremum of diverging series"):}$ """, font_size = font_title, alignment = '\\flushleft')
        holy_spirit_def_title.set_color(BLACK)
        holy_spirit_def_math = TexText(""" $
                                \\exists +\infty \\notin \mathbb{R} \\newline
                                 e_{+\infty} \\notin \mathbb{E} \\newline
                                 \sigma_{+\infty} = +\\newline
                             \\forall (x_{k})_{k \in \mathbb{N}} \in \mathbb{R}^{\mathbb{N}},\\newline  (\\forall A \in \mathbb{E},\exists No \in \mathbb{N}, A \leq \sum_{ k  = 0}^{No} e_{x_{k}})\\newline  \Leftrightarrow\\newline  sup_{n \in  \mathbb{N}} (\sum_{ k  = 0}^{n} e_{x_{k}}) = e_{+\infty} $
                         """,font_size = font_eq, alignment = '\\flushleft')
        holy_spirit_def_math.set_color(BLACK)

        holy_spirit_def_title.align_to(next, LEFT)
        holy_spirit_def_title.align_to(next.get_bottom(), UP).shift(margin_up)
        self.add(holy_spirit_def_title)
        next = holy_spirit_def_title

        holy_spirit_def_math.align_to(next, LEFT)
        holy_spirit_def_math.align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(holy_spirit_def_math)
        next = holy_spirit_def_math

        self.wait(4 * default_wait_per_paragraph)

        holy_spirit_complete_title = TexText("""$ +\infty \\textbf{ is the sole transcendent supremum ("The Holy }\\newline \\textbf{Spirit as the sole transcendant supremum"):}$ """, font_size = font_title, alignment = '\\flushleft')
        holy_spirit_complete_title.set_color(BLACK)
        holy_spirit_complete_math = TexText("""$\\forall (x_{k})_{k \in \mathbb{N}} \in \mathbb{R}^{\mathbb{N}},\\newline 
                                                sup_{n \in  \mathbb{N}} (\sum_{ k  = 0}^{n} e_{x_{k}})  \\notin \mathbb{E} \\newline 
                                                \Leftrightarrow \\newline 
                                                sup_{n \in  \mathbb{N}} (\sum_{ k  = 0}^{n} e_{x_{k}}) = e_{+\infty}
                                               $
                         """,font_size = font_eq, alignment = '\\flushleft')
        holy_spirit_complete_math.set_color(BLACK)

        holy_spirit_complete_title.align_to(frame, LEFT).shift(margin_left)
        holy_spirit_complete_title.align_to(next.get_bottom(), UP).shift(margin_up)
        self.add(holy_spirit_complete_title)
        next = holy_spirit_complete_title



        holy_spirit_complete_math.align_to(frame, LEFT).shift(margin_left)
        holy_spirit_complete_math.align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(holy_spirit_complete_math)
        next = holy_spirit_complete_math

        self.wait(4 * default_wait_per_paragraph)

        objects_holy_spirit_eq_to_fade = [intro_holy_spirit_title,intro_holy_spirit_math,holy_spirit_def_title,holy_spirit_def_math
                ,holy_spirit_complete_title,holy_spirit_complete_math]


        self.play(*[FadeOut(obj) for obj in objects_holy_spirit_eq_to_fade], run_time=2)



        ## BEGINNING TRANSCENDENT EQUATIONS ##

        intro_trinity_eq_title = TexText("""$ \\textbf{Transcendental Trinitarian equations :}$ """, font_size=font_title, alignment = '\\flushleft')
        intro_trinity_eq_title.set_color(BLACK)

        intro_trinity_eq_title.align_to(frame, LEFT).shift(margin_left)
        intro_trinity_eq_title.align_to(frame, UP).shift(margin_up)
        self.add(intro_trinity_eq_title)

        next = intro_trinity_eq_title

        # Create a math equation using TexText
        intro_trinity_eq_math = TexText("""$\\exists (-1) \\in \\mathbb{R}, 0 = 1 + (-1) \\newline
                                            \\exists (-\infty) \\notin \\mathbb{R},  0 = +\infty + (-\infty) \\newline
                                            1 = 0 \\times (+\infty) \\newline
                                            +\infty = 0 + (+\infty) \\newline
                                            +\infty = 1 + (+\infty) $
                                            """, font_size=font_eq, color=BLACK, alignment = '\\flushleft')
        intro_trinity_eq_math.set_color(BLACK)

        # Position the equation within the frame
        intro_trinity_eq_math .align_to(frame, LEFT).shift(margin_left)
        intro_trinity_eq_math .align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(intro_trinity_eq_math )

        next = intro_trinity_eq_math

        self.wait(4 * default_wait_per_paragraph)

        intro_transcendent_eq_title = TexText("""$ \\textbf{Transcendental equations :}$ """, font_size=font_title, alignment = '\\flushleft')
        intro_transcendent_eq_title.set_color(BLACK)

        intro_transcendent_eq_title.align_to(frame, LEFT).shift(margin_left)
        intro_transcendent_eq_title.align_to(next.get_bottom(), UP).shift(margin_up)
        self.add(intro_transcendent_eq_title)

        next = intro_transcendent_eq_title

        # Create a math equation using TexText
        intro_transcendent_eq_math = TexText("""$ \\forall x \\in \\mathbb{R}^{+} \\newline
                                            \\exists -x \\in \\mathbb{R}, 0 = x + (-x) \\newline
                                            +\infty = x + (+\infty) $
                                            """, font_size=font_eq, color=BLACK, alignment = '\\flushleft')
        intro_transcendent_eq_math.set_color(BLACK)

        # Position the equation within the frame
        intro_transcendent_eq_math .align_to(frame, LEFT).shift(margin_left)
        intro_transcendent_eq_math .align_to(next.get_bottom(), UP).shift(margin_up_s)
        self.add(intro_transcendent_eq_math )

        next = intro_transcendent_eq_math

        self.wait(2 * default_wait_per_paragraph)

        objects_transcendent_eq_to_fade = [intro_trinity_eq_title,intro_trinity_eq_math,intro_transcendent_eq_title,intro_transcendent_eq_math
                                           , frame]


        self.wait(6)

        self.play(*[FadeOut(obj) for obj in objects_transcendent_eq_to_fade], run_time=2)

        ### Create natural numbers ###

        vertical_2_segment = Line(2*dot_squeeze.get_center() - 0.1 * UP, 2*dot_squeeze.get_center() + 0.1 * UP)
        self.play(FadeIn(vertical_2_segment),run_time=1)

        vertical_3_segment = Line(3 * dot_squeeze.get_center() - 0.1 * UP, 3 * dot_squeeze.get_center() + 0.1 * UP)

        self.play(FadeIn(vertical_3_segment), run_time=1)

        vertical_4_segment = Line(4 * dot_squeeze.get_center() - 0.1 * UP, 4 * dot_squeeze.get_center() + 0.1 * UP)

        self.play(FadeIn(vertical_4_segment), run_time=1)

        vertical_5_segment = Line(5 * dot_squeeze.get_center() - 0.1 * UP, 5 * dot_squeeze.get_center() + 0.1 * UP)

        self.play(FadeIn(vertical_5_segment), run_time=1)

        vertical_6_segment = Line(6 * dot_squeeze.get_center() - 0.1 * UP, 6 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_6_segment)


        self.wait(5)



        vertical_7_segment = Line(7 * dot_squeeze.get_center() - 0.1 * UP, 7 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_7_segment)

        vertical_8_segment = Line(8 * dot_squeeze.get_center() - 0.1 * UP, 8 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_8_segment)

        vertical_9_segment = Line(9 * dot_squeeze.get_center() - 0.1 * UP, 9 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_9_segment)

        vertical_10_segment = Line(10 * dot_squeeze.get_center() - 0.1 * UP, 10 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_10_segment)

        vertical_11_segment = Line(11 * dot_squeeze.get_center() - 0.1 * UP, 11 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_11_segment)

        vertical_12_segment = Line(12 * dot_squeeze.get_center() - 0.1 * UP, 12 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_12_segment)

        vertical_13_segment = Line(13 * dot_squeeze.get_center() - 0.1 * UP, 13 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_13_segment)

        vertical_14_segment = Line(14 * dot_squeeze.get_center() - 0.1 * UP, 14 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_14_segment)

        vertical_15_segment = Line(15 * dot_squeeze.get_center() - 0.1 * UP, 15 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_15_segment)

        vertical_16_segment = Line(16 * dot_squeeze.get_center() - 0.1 * UP, 16 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_16_segment)

        vertical_17_segment = Line(17 * dot_squeeze.get_center() - 0.1 * UP, 17 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_17_segment)

        vertical_18_segment = Line(18 * dot_squeeze.get_center() - 0.1 * UP, 18 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_18_segment)

        vertical_19_segment = Line(19 * dot_squeeze.get_center() - 0.1 * UP, 19 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_19_segment)

        vertical_20_segment = Line(20 * dot_squeeze.get_center() - 0.1 * UP, 20 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_20_segment)

        vertical_21_segment = Line(21 * dot_squeeze.get_center() - 0.1 * UP, 21 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_21_segment)

        vertical_22_segment = Line(22 * dot_squeeze.get_center() - 0.1 * UP, 22 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_22_segment)

        vertical_23_segment = Line(23 * dot_squeeze.get_center() - 0.1 * UP, 23 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_23_segment)

        vertical_24_segment = Line(24 * dot_squeeze.get_center() - 0.1 * UP, 24 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_24_segment)

        vertical_25_segment = Line(25 * dot_squeeze.get_center() - 0.1 * UP, 25 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_25_segment)

        vertical_26_segment = Line(26 * dot_squeeze.get_center() - 0.1 * UP, 26 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_26_segment)

        vertical_27_segment = Line(27 * dot_squeeze.get_center() - 0.1 * UP, 27 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_27_segment)

        vertical_28_segment = Line(28 * dot_squeeze.get_center() - 0.1 * UP, 28 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_28_segment)

        vertical_29_segment = Line(29 * dot_squeeze.get_center() - 0.1 * UP, 29 * dot_squeeze.get_center() + 0.1 * UP)
        self.add(vertical_29_segment)


        # Animate the dot to move to the origin
        self.play(
            self.camera.frame.animate.move_to(ORIGIN+[20,0,0]),
            run_time=6
        )

        self.play(
            self.camera.frame.animate.move_to(ORIGIN),
            run_time=3
        )

        n_text = TexText("$\mathbb{N}$", font_size=144, color=YELLOW)
        n_text.move_to(self.camera.frame.get_bottom()/2+ self.camera.frame.get_left()/2) #to_edge(DOWN)

        self.play(Write(n_text))


        ## TRAVEL DOT ##

        travel_creating_dot = Dot([1, 0, 0])
        travel_creating_dot.set_opacity(0)

        travel_creating_dot2 = Dot([1, 0, 0])
        travel_creating_dot2.set_opacity(1)

        curve_final = CurvedArrow(top_point, travel_creating_dot.get_center(), angle=-TAU / 4, radius=1.5, color=YELLOW)
        curve_inverse = CurvedArrow(top_point, travel_creating_dot2.get_center(), angle=-TAU / 4, radius=1.5, color=WHITE)

        self.wait(4)

        self.play(AnimationGroup(ShowCreation(curve_inverse), ShowCreation(curve_final)), run_time=5)
        dotrest = Dot(color='#808080', opacity=1)
        dotrest.move_to(ORIGIN)  # axes.c2p(0, 0))

        def update_curve_final(curve):
            # top_point and travel_creating_dot.get_center() are assumed to be numpy arrays
            distance = np.sqrt((travel_creating_dot.get_center()[0] - 1) ** 2 +
                               (travel_creating_dot.get_center()[1] - 0) ** 2 +
                               (travel_creating_dot.get_center()[2] - 0) ** 2)

            updated_curve = CurvedArrow(top_point, travel_creating_dot.get_center(),
                                        angle=-TAU / 4 + (min(distance,10) / 10 * TAU / 4), radius=1.5, color=YELLOW)

            curve.become(updated_curve)


        def update_curve_inverse(curve):
            # top_point and travel_creating_dot.get_center() are assumed to be numpy arrays
            distance = np.sqrt((travel_creating_dot.get_center()[0] - 1) ** 2 +
                               (travel_creating_dot.get_center()[1] - 0) ** 2 +
                               (travel_creating_dot.get_center()[2] - 0) ** 2)

            # travel_creating_dot2.get_center()
            updated_curve = CurvedArrow(top_point, [1 / travel_creating_dot.get_center()[0], 0, 0],
                                        angle=-TAU / 4 + (min(distance,10) / 10 * TAU / 4), radius=1.5, color=YELLOW)
            # updated_curve.add_tip(arrow_tip)
            curve.become(updated_curve)


        curve_final.add_updater(lambda m: update_curve_final(m))

        curve_inverse.add_updater(lambda m: update_curve_inverse(m))

        self.wait(1)
        self.play(travel_creating_dot.animate.shift([1,0,0]), run_time=1)


        self.wait(8)
        for i in range(20) :

            self.play(travel_creating_dot.animate.shift([1,0,0]), run_time=0.5)
            if i < 6:
                self.wait(0.5)
            else:
                self.wait(0.25)
        self.wait(4)
        for i in range(21) :
            self.play(travel_creating_dot.animate.shift([-1,0,0]), run_time=0.05)
            self.wait(0.1)

        vertical_lo_segment.clear_updaters()

        # def generate_vertical_segment_code(i):
        #     code = f"""
        # vertical_{i}_segment = Line({i} * dot_squeeze.get_center() - 0.1 * UP, {i} * dot_squeeze.get_center() + 0.1 * UP)
        # self.add(vertical_{i}_segment)
        #
        # """
        #     #vertical_{i}_segment.add_updater(lambda l: l.become(Line({i} * dot_squeeze.get_center() - 0.1 * UP, {i} * dot_squeeze.get_center() + 0.1 * UP)))
        #     return code
        #
        #
        # for i in range(40):
        #     code_for_i_2 = generate_vertical_segment_code(i)
        #     print(code_for_i_2 )


        vertical_rational_1_segment = Line(1 * dot_squeeze.get_center() - 0.1 * UP, 1 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_1_segment.add_updater(lambda l: l.become(Line(1 * dot_squeeze.get_center() - 0.1 * UP, 1 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_1_segment)

        vertical_rational_2_segment = Line(2 * dot_squeeze.get_center() - 0.1 * UP, 2 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_2_segment.add_updater(lambda l: l.become(Line(2 * dot_squeeze.get_center() - 0.1 * UP, 2 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_2_segment)

        vertical_rational_3_segment = Line(3 * dot_squeeze.get_center() - 0.1 * UP, 3 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_3_segment.add_updater(lambda l: l.become(Line(3 * dot_squeeze.get_center() - 0.1 * UP, 3 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_3_segment)

        vertical_rational_4_segment = Line(4 * dot_squeeze.get_center() - 0.1 * UP, 4 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_4_segment.add_updater(lambda l: l.become(Line(4 * dot_squeeze.get_center() - 0.1 * UP, 4 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_4_segment)

        vertical_rational_5_segment = Line(5 * dot_squeeze.get_center() - 0.1 * UP, 5 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_5_segment.add_updater(lambda l: l.become(Line(5 * dot_squeeze.get_center() - 0.1 * UP, 5 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_5_segment)

        vertical_rational_6_segment = Line(6 * dot_squeeze.get_center() - 0.1 * UP, 6 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_6_segment.add_updater(lambda l: l.become(Line(6 * dot_squeeze.get_center() - 0.1 * UP, 6 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_6_segment)

        vertical_rational_7_segment = Line(7 * dot_squeeze.get_center() - 0.1 * UP, 7 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_7_segment.add_updater(lambda l: l.become(Line(7 * dot_squeeze.get_center() - 0.1 * UP, 7 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_7_segment)

        vertical_rational_8_segment = Line(8 * dot_squeeze.get_center() - 0.1 * UP, 8 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_8_segment.add_updater(lambda l: l.become(Line(8 * dot_squeeze.get_center() - 0.1 * UP, 8 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_8_segment)

        vertical_rational_9_segment = Line(9 * dot_squeeze.get_center() - 0.1 * UP, 9 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_9_segment.add_updater(lambda l: l.become(Line(9 * dot_squeeze.get_center() - 0.1 * UP, 9 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_9_segment)

        vertical_rational_10_segment = Line(10 * dot_squeeze.get_center() - 0.1 * UP, 10 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_10_segment.add_updater(lambda l: l.become(Line(10 * dot_squeeze.get_center() - 0.1 * UP, 10 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_10_segment)

        vertical_rational_11_segment = Line(11 * dot_squeeze.get_center() - 0.1 * UP, 11 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_11_segment.add_updater(lambda l: l.become(Line(11 * dot_squeeze.get_center() - 0.1 * UP, 11 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_11_segment)

        vertical_rational_12_segment = Line(12 * dot_squeeze.get_center() - 0.1 * UP, 12 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_12_segment.add_updater(lambda l: l.become(Line(12 * dot_squeeze.get_center() - 0.1 * UP, 12 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_12_segment)

        vertical_rational_13_segment = Line(13 * dot_squeeze.get_center() - 0.1 * UP, 13 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_13_segment.add_updater(lambda l: l.become(Line(13 * dot_squeeze.get_center() - 0.1 * UP, 13 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_13_segment)

        vertical_rational_14_segment = Line(14 * dot_squeeze.get_center() - 0.1 * UP, 14 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_14_segment.add_updater(lambda l: l.become(Line(14 * dot_squeeze.get_center() - 0.1 * UP, 14 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_14_segment)

        vertical_rational_15_segment = Line(15 * dot_squeeze.get_center() - 0.1 * UP, 15 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_15_segment.add_updater(lambda l: l.become(Line(15 * dot_squeeze.get_center() - 0.1 * UP, 15 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_15_segment)

        vertical_rational_16_segment = Line(16 * dot_squeeze.get_center() - 0.1 * UP, 16 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_16_segment.add_updater(lambda l: l.become(Line(16 * dot_squeeze.get_center() - 0.1 * UP, 16 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_16_segment)

        vertical_rational_17_segment = Line(17 * dot_squeeze.get_center() - 0.1 * UP, 17 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_17_segment.add_updater(lambda l: l.become(Line(17 * dot_squeeze.get_center() - 0.1 * UP, 17 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_17_segment)

        vertical_rational_18_segment = Line(18 * dot_squeeze.get_center() - 0.1 * UP, 18 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_18_segment.add_updater(lambda l: l.become(Line(18 * dot_squeeze.get_center() - 0.1 * UP, 18 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_18_segment)

        vertical_rational_19_segment = Line(19 * dot_squeeze.get_center() - 0.1 * UP, 19 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_19_segment.add_updater(lambda l: l.become(Line(19 * dot_squeeze.get_center() - 0.1 * UP, 19 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_19_segment)

        vertical_rational_20_segment = Line(20 * dot_squeeze.get_center() - 0.1 * UP, 20 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_20_segment.add_updater(lambda l: l.become(Line(20 * dot_squeeze.get_center() - 0.1 * UP, 20 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_20_segment)

        vertical_rational_21_segment = Line(21 * dot_squeeze.get_center() - 0.1 * UP, 21 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_21_segment.add_updater(lambda l: l.become(Line(21 * dot_squeeze.get_center() - 0.1 * UP, 21 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_21_segment)

        vertical_rational_22_segment = Line(22 * dot_squeeze.get_center() - 0.1 * UP, 22 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_22_segment.add_updater(lambda l: l.become(Line(22 * dot_squeeze.get_center() - 0.1 * UP, 22 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_22_segment)

        vertical_rational_23_segment = Line(23 * dot_squeeze.get_center() - 0.1 * UP, 23 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_23_segment.add_updater(lambda l: l.become(Line(23 * dot_squeeze.get_center() - 0.1 * UP, 23 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_23_segment)

        vertical_rational_24_segment = Line(24 * dot_squeeze.get_center() - 0.1 * UP, 24 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_24_segment.add_updater(lambda l: l.become(Line(24 * dot_squeeze.get_center() - 0.1 * UP, 24 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_24_segment)

        vertical_rational_25_segment = Line(25 * dot_squeeze.get_center() - 0.1 * UP, 25 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_25_segment.add_updater(lambda l: l.become(Line(25 * dot_squeeze.get_center() - 0.1 * UP, 25 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_25_segment)

        vertical_rational_26_segment = Line(26 * dot_squeeze.get_center() - 0.1 * UP, 26 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_26_segment.add_updater(lambda l: l.become(Line(26 * dot_squeeze.get_center() - 0.1 * UP, 26 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_26_segment)

        vertical_rational_27_segment = Line(27 * dot_squeeze.get_center() - 0.1 * UP, 27 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_27_segment.add_updater(lambda l: l.become(Line(27 * dot_squeeze.get_center() - 0.1 * UP, 27 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_27_segment)

        vertical_rational_28_segment = Line(28 * dot_squeeze.get_center() - 0.1 * UP, 28 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_28_segment.add_updater(lambda l: l.become(Line(28 * dot_squeeze.get_center() - 0.1 * UP, 28 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_28_segment)

        vertical_rational_29_segment = Line(29 * dot_squeeze.get_center() - 0.1 * UP, 29 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_29_segment.add_updater(lambda l: l.become(Line(29 * dot_squeeze.get_center() - 0.1 * UP, 29 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_29_segment)

        vertical_rational_30_segment = Line(30 * dot_squeeze.get_center() - 0.1 * UP, 30 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_30_segment.add_updater(lambda l: l.become(Line(30 * dot_squeeze.get_center() - 0.1 * UP, 30 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_30_segment)

        vertical_rational_31_segment = Line(31 * dot_squeeze.get_center() - 0.1 * UP, 31 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_31_segment.add_updater(lambda l: l.become(Line(31 * dot_squeeze.get_center() - 0.1 * UP, 31 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_31_segment)

        vertical_rational_32_segment = Line(32 * dot_squeeze.get_center() - 0.1 * UP, 32 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_32_segment.add_updater(lambda l: l.become(Line(32 * dot_squeeze.get_center() - 0.1 * UP, 32 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_32_segment)

        vertical_rational_33_segment = Line(33 * dot_squeeze.get_center() - 0.1 * UP, 33 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_33_segment.add_updater(lambda l: l.become(Line(33 * dot_squeeze.get_center() - 0.1 * UP, 33 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_33_segment)

        vertical_rational_34_segment = Line(34 * dot_squeeze.get_center() - 0.1 * UP, 34 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_34_segment.add_updater(lambda l: l.become(Line(34 * dot_squeeze.get_center() - 0.1 * UP, 34 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_34_segment)

        vertical_rational_35_segment = Line(35 * dot_squeeze.get_center() - 0.1 * UP, 35 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_35_segment.add_updater(lambda l: l.become(Line(35 * dot_squeeze.get_center() - 0.1 * UP, 35 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_35_segment)

        vertical_rational_36_segment = Line(36 * dot_squeeze.get_center() - 0.1 * UP, 36 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_36_segment.add_updater(lambda l: l.become(Line(36 * dot_squeeze.get_center() - 0.1 * UP, 36 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_36_segment)

        vertical_rational_37_segment = Line(37 * dot_squeeze.get_center() - 0.1 * UP, 37 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_37_segment.add_updater(lambda l: l.become(Line(37 * dot_squeeze.get_center() - 0.1 * UP, 37 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_37_segment)

        vertical_rational_38_segment = Line(38 * dot_squeeze.get_center() - 0.1 * UP, 38 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_38_segment.add_updater(lambda l: l.become(Line(38 * dot_squeeze.get_center() - 0.1 * UP, 38 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_38_segment)

        vertical_rational_39_segment = Line(39 * dot_squeeze.get_center() - 0.1 * UP, 39 * dot_squeeze.get_center() + 0.1 * UP)
        vertical_rational_39_segment.add_updater(lambda l: l.become(Line(39 * dot_squeeze.get_center() - 0.1 * UP, 39 * dot_squeeze.get_center() + 0.1 * UP)))
        self.add(vertical_rational_39_segment)

        self.wait(8)

        self.play(travel_creating_dot.animate.shift([1, 0, 0]), run_time=1)
        self.wait(1)
        self.play(
            dot_squeeze.animate.move_to(ORIGIN + [0.5, 0, 0]),
            run_time=2
        )

        self.wait(8)
        self.play(travel_creating_dot.animate.shift([1,0,0]), run_time=1)
        self.wait(1)
        self.play(
            dot_squeeze.animate.move_to(ORIGIN + [0.333333333333333, 0, 0]),
            run_time=2
        )
        self.wait(4)
        self.play(travel_creating_dot.animate.shift([1,0,0]), run_time=1)
        self.wait(1)
        self.play(
            dot_squeeze.animate.move_to(ORIGIN + [0.25, 0, 0]),
            run_time=2
        )
        self.wait(4)



        ### DISPLAY Q #####+-

        # Create N and Q

        q_text = TexText("$\mathbb{Q}$", font_size=144, color=YELLOW)

        # Set positions
        q_text.to_corner(DL).move_to(self.camera.frame.get_bottom()/2)


        # Display
        self.play( Write(q_text))

        objects_to_fade_out_rational = [curve_final,curve_inverse,

                                         vertical_rational_1_segment, vertical_rational_2_segment,
                                         vertical_rational_3_segment, vertical_rational_4_segment,
                                         vertical_rational_5_segment, vertical_rational_6_segment,
                                         vertical_rational_7_segment, vertical_rational_8_segment,
                                         vertical_rational_9_segment, vertical_rational_10_segment,
                                         vertical_rational_11_segment, vertical_rational_12_segment,
                                         vertical_rational_13_segment, vertical_rational_14_segment,
                                         vertical_rational_15_segment, vertical_rational_16_segment,
                                         vertical_rational_17_segment, vertical_rational_18_segment,
                                         vertical_rational_19_segment, vertical_rational_20_segment,
                                         vertical_rational_21_segment, vertical_rational_22_segment,
                                         vertical_rational_23_segment, vertical_rational_24_segment,
                                         vertical_rational_25_segment, vertical_rational_26_segment,
                                         vertical_rational_27_segment, vertical_rational_28_segment,
                                         vertical_rational_29_segment, vertical_rational_30_segment,
                                         vertical_rational_31_segment, vertical_rational_32_segment,
                                         vertical_rational_33_segment, vertical_rational_34_segment,
                                         vertical_rational_35_segment, vertical_rational_36_segment,
                                         vertical_rational_37_segment, vertical_rational_38_segment,
                                         vertical_rational_39_segment,
                                         vertical_2_segment,
                                         vertical_3_segment, vertical_4_segment,
                                         vertical_5_segment, vertical_6_segment,
                                         vertical_7_segment, vertical_8_segment,
                                         vertical_9_segment, vertical_10_segment,
                                         vertical_11_segment, vertical_12_segment,
                                         vertical_13_segment, vertical_14_segment,
                                         vertical_15_segment, vertical_16_segment,
                                         vertical_17_segment, vertical_18_segment,
                                         vertical_19_segment, vertical_20_segment,
                                         vertical_21_segment, vertical_22_segment,
                                         vertical_23_segment, vertical_24_segment,
                                         vertical_25_segment, vertical_26_segment,
                                         vertical_27_segment, vertical_28_segment,
                                         vertical_29_segment]
        for s in objects_to_fade_out_rational:
            s.clear_updaters()

        self.play(*[FadeOut(obj) for obj in objects_to_fade_out_rational], run_time=4)

        def pi_approximation(i):
            S=0
            for j in range(i+1):
                S = S + 8 / ((4 * j + 1) * (4 * j + 3))
            return S



        # Create a dot at [1, 0, 0]
        dot_pi = Dot(point=[pi_approximation(0), 0, 0], color=WHITE).set_opacity(0)
        # Attach a label to the dot
        dot_label = TexText("$\\frac{8}{3}$").next_to(dot_pi, DOWN)
        # Create a vertical line segment attached to the dot
        vertical_pi_segment = Line(dot_pi.get_center() - 0.1 * UP, dot_pi.get_center() + 0.1 * UP)
        vertical_pi_segment.add_updater(lambda l : l.become(Line(dot_pi.get_center() - 0.1 * UP, dot_pi.get_center() + 0.1 * UP)))

        self.play(FadeIn(vertical_pi_segment), run_time=2)

        # Display the dot, label, and vertical line segment
        self.play(Write(dot_label))

        # Move the dot to [1.5, 0, 0]
        self.play(dot_pi.animate.move_to([pi_approximation(1), 0, 0]))
        dot_label.become(TexText("$\\frac{304}{105}$").next_to(dot_pi, DOWN))
        self.wait(0.5)

        self.play(dot_pi.animate.move_to([pi_approximation(2), 0, 0]))
        dot_label.become(TexText("$\sum_{n=0}^{2} \\frac{8}{(4n+1)(4n+3)}$").next_to(dot_pi, DOWN))
        self.wait(0.5)

        self.play(dot_pi.animate.move_to([pi_approximation(3), 0, 0]))
        dot_label.become(TexText("$\sum_{n=0}^{3} \\frac{8}{(4n+1)(4n+3)}$").next_to(dot_pi, DOWN))
        self.wait(0.5)

        self.play(dot_pi.animate.move_to([pi_approximation(4), 0, 0]))
        dot_label.become(TexText("$\sum_{n=0}^{4} \\frac{8}{(4n+1)(4n+3)}$").next_to(dot_pi, DOWN))
        self.wait(0.5)
        self.play(dot_pi.animate.move_to([pi_approximation(5), 0, 0]))
        dot_label.become(TexText("$\sum_{n=0}^{5} \\frac{8}{(4n+1)(4n+3)}$").next_to(dot_pi, DOWN))
        self.wait(0.5)
        for i in range(95):
            dot_pi.move_to([pi_approximation(i+6), 0, 0])
            dot_label.become(TexText("$\sum_{n=0}^{"+str(i+6)+"} \\frac{8}{(4n+1)(4n+3)}$").next_to(dot_pi, DOWN))
            self.wait(0.05)


        self.play(dot_pi.animate.move_to([PI, 0, 0]))
        dot_label.become(TexText("$\pi$",color=YELLOW).next_to(dot_pi, DOWN))

        pi_leibniz = TexText("$= sup_{k \in \mathbb{N}}(\sum_{n=0}^{k} \\frac{8}{(4n+1)(4n+3)})$", color=WHITE,font_size = 32).next_to(dot_label, DOWN)
        self.add(pi_leibniz)
        self.wait(6)

        # add extension and curve

        line_pi = Line(ORIGIN, dot_pi.get_center(), color=YELLOW) #.shift([0,0,-0.001])

        curve_pi = CurvedArrow(top_point, dot_pi.get_center(), angle=-TAU / 4, radius=1.5, color=YELLOW)

        brace_pi = Brace(line_pi, DOWN, color=GREY).shift(0.4*DOWN)

        label_space_e_pi = TexText("$e_{\pi}$", color=GREY).move_to(brace.get_center()).shift(0.5*DOWN+0.4*LEFT).shift(0.5*DOWN)
        label_time_e_pi = TexText("$e_{\pi}$", color=GREY).next_to(curve_pi.get_center(), RIGHT).shift(0.5*RIGHT+0.6*UP)

        self.play(FadeOut(pi_leibniz), run_time=1)

        self.play(AnimationGroup(ShowCreation(line_pi),ShowCreation(curve_pi),lag_ratio=0.2), run_time=5)

        self.play(AnimationGroup(FadeIn(brace_pi), FadeIn(label_space_e_pi), FadeIn(label_time_e_pi)), run_time=1)

        self.wait(8)

        pi_object_to_fade_out = [label_space_e_pi,label_time_e_pi,curve_pi,line_pi,brace_pi ]

        self.play(*[FadeOut(obj) for obj in pi_object_to_fade_out],run_time=1)
        self.wait(1)


        # Create a dot at [1, 0, 0]
        dot_euler = Dot(point=[math.e, 0, 0], color=WHITE).set_opacity(0)
        # Attach a label to the dot
        dot_euler_label = TexText("$e$", color=YELLOW).next_to(dot_euler, DOWN)
        # Create a vertical line segment attached to the dot
        vertical_euler_segment = Line(dot_euler.get_center() - 0.1 * UP, dot_euler.get_center() + 0.1 * UP)

        self.add(vertical_euler_segment)
        self.add(dot_euler_label)

        euler_series = TexText("$= sup_{k \in \mathbb{N}}(\sum_{n=0}^{k} \\frac{1}{n!})$", color=WHITE
                             , font_size=32).next_to(dot_euler_label, DOWN)
        self.add(euler_series)
        self.wait(6)
        self.play(FadeOut(euler_series))

        r_text = TexText("$\mathbb{R}$", font_size=144, color=YELLOW)
        r_text.move_to(self.camera.frame.get_bottom()/2+ self.camera.frame.get_right()/2) #to_edge(DOWN)

        self.play(Write(r_text))
        # Get all mobjects on the screen
        all_mobjects = self.mobjects

        # Define the scaling factor
        scale_factor = 0.01
        self.wait(8)


        circle.set_opacity(0)

        seg_created_light.put_start_and_end_on(ORIGIN,self.camera.frame.get_right())

        sign_holy_spirit.clear_updaters()

        sign_holy_spirit_label.clear_updaters()




        ## START THE INT=EXT VISUAL ##

        # Create copies and scale them
        scaled_mobjects = [mob.copy() for mob in all_mobjects]

        scaled_mobjects_new = [mob.copy() for mob in scaled_mobjects]

        circle_pi = Circle(radius = 10, color=WHITE, fill_opacity=0, stroke_width=3,stroke_color=WHITE)
        new_digits = TexText("$\pi$", font_size=800, color=YELLOW)
        new_digits.move_to(self.camera.frame.get_top()+2*UP)
        self.add(new_digits)
        self.add(circle_pi)
        g = Group(*scaled_mobjects_new,circle_pi,new_digits)
        #g.shift(self.camera.frame.get_top()*1.1-circle_pi.get_bottom())

        # Add the scaled copies to the scene
        self.play(g.animate.move_to([PI,0,0]).scale(0.001),run_time=6)

        self.remove(g)

        scaled_mobjects_new = [mob.copy() for mob in scaled_mobjects]

        circle_pi = Circle(radius = 10, color=WHITE, fill_opacity=0, stroke_width=3,stroke_color=WHITE)
        new_digits = TexText("$e$", font_size=800, color=YELLOW)
        new_digits.move_to(self.camera.frame.get_top()+2*UP)
        self.add(new_digits)
        self.add(circle_pi)
        g2 = Group(*scaled_mobjects_new,circle_pi,new_digits)

        self.play(g2.animate.move_to([math.e, 0, 0]).scale(0.001),run_time=4)
        self.remove(g2)

        scaled_mobjects_new = [mob.copy() for mob in scaled_mobjects]

        circle_pi = Circle(radius = 10, color=WHITE, fill_opacity=0, stroke_width=3,stroke_color=WHITE)
        new_digits = TexText("$\sqrt{2}$", font_size=600, color=YELLOW)
        new_digits.move_to(self.camera.frame.get_top()+2*UP)
        self.add(new_digits)
        self.add(circle_pi)
        g3 = Group(*scaled_mobjects_new,circle_pi,new_digits)

        # Add the scaled copies to the scene
        self.play(g3.animate.move_to([math.sqrt(2),0,0]).scale(0.001), run_time=4)

        self.remove(g3)


        dot_sqrt2 = Dot(point=[math.sqrt(2), 0, 0], color=WHITE).set_opacity(0)

        dot_sqrt2_label = TexText("$\sqrt{2}$", color=YELLOW,font_size=32).next_to(dot_sqrt2, DOWN).shift(0.06*UP)
        # Create a vertical line segment attached to the dot
        vertical_sqrt2_segment = Line(dot_sqrt2.get_center() - 0.1 * UP, dot_sqrt2.get_center() + 0.1 * UP)

        self.add(vertical_sqrt2_segment)
        self.add(dot_sqrt2_label)


        scaled_mobjects_new = [mob.copy() for mob in scaled_mobjects]

        circle_pi = Circle(radius = 10, color=WHITE, fill_opacity=0, stroke_width=3,stroke_color=WHITE)
        new_digits = TexText("$1$", font_size=800, color=YELLOW)
        new_digits.move_to(self.camera.frame.get_top()+2*UP)
        self.add(new_digits)
        self.add(circle_pi)
        g3 = Group(*scaled_mobjects_new,circle_pi,new_digits)

        # Add the scaled copies to the scene
        self.play(g3.animate.move_to([1,0,0]).scale(0.001), run_time=4)

        self.remove(g3)

        dot_sqrt2 = Dot(point=[1, 0, 0], color=WHITE).set_opacity(0)

        dot_sqrt2_label = TexText("$1$", color=YELLOW,font_size=34).next_to(dot_sqrt2, DOWN).shift(0.02*UP)
        # Create a vertical line segment attached to the dot
        vertical_sqrt2_segment = Line(dot_sqrt2.get_center() - 0.1 * UP, dot_sqrt2.get_center() + 0.1 * UP)

        self.add(vertical_sqrt2_segment)
        self.add(dot_sqrt2_label)

        # Wait for a moment
        self.wait(2)

        seg_created_2 = Line(ORIGIN,self.camera.frame.get_left(),  color=WHITE, stroke_width=5, stroke_opacity=0.5)

        self.play(Write(seg_created_2),run_time=4)

        dot_0_label = TexText("$0$", color=WHITE,font_size=36).next_to(father_dot.get_center(), DOWN).shift(0.055*DOWN)
        # Create a vertical line segment attached to the dot
        self.add(dot_0_label)

        n_text.set_color(WHITE)
        q_text.set_color(WHITE)
        r_text.set_color(WHITE)

        self.wait(12)
